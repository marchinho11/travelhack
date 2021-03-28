import pickle

import tensorflow as tf
from loguru import logger
from deepctr.models import DeepFM
from sklearn.preprocessing import MinMaxScaler
from deepctr.feature_column import DenseFeat, SparseFeat, get_feature_names


class DeepFMHelper:
    def __init__(self):
        self.min_max_scaler = MinMaxScaler(feature_range=(0, 1))
        self.cat_features = [
            "user_Вид тура_last",
            "user_Звездность_last",
            "tour_Страна",
            "tour_Страна тура",
            "user_Тип заявки_last",
        ]
        self.dense_features = None
        self.fixlen_feature_columns = None
        self.feature_names = None
        self.model = None

    def fit(self, X, y):
        X_ = X.copy()
        self.dense_features = list(X_.columns.difference(self.cat_features))

        logger.debug("MinMaxScaler")
        self.min_max_scaler.fit(X_[self.dense_features])
        X_[self.dense_features] = self.min_max_scaler.transform(X_[self.dense_features])

        self._column_mapping(X_)
        X_.columns = [self.columns_mapping[col] for col in X_.columns]

        self.fixlen_feature_columns = [
            SparseFeat(
                self.columns_mapping[feat],
                vocabulary_size=X_[self.columns_mapping[feat]].max() + 1,
                embedding_dim=4,
            )
            for i, feat in enumerate(self.cat_features)
        ] + [
            DenseFeat(
                self.columns_mapping[feat],
                1,
            )
            for feat in self.dense_features
        ]
        self.feature_names = get_feature_names(self.fixlen_feature_columns)

        logger.debug("Compile DeepFM model")
        self.model = DeepFM(
            self.fixlen_feature_columns, self.fixlen_feature_columns, task="binary"
        )
        self.model.compile(
            "adam",
            "binary_crossentropy",
            metrics=["binary_crossentropy"],
        )

        logger.debug("Fit DeepFM")
        train_model_input = {name: X_[name].values for name in self.feature_names}
        self.model.fit(
            train_model_input,
            y,
            batch_size=256,
            epochs=3,
            verbose=2,
            validation_split=0.2,
        )

    def predict_proba(self, X):
        X_ = X.copy()
        X_[self.dense_features] = self.min_max_scaler.transform(X_[self.dense_features])
        X_.columns = [self.columns_mapping[col] for col in X_.columns]
        model_input = {name: X_[name].values for name in self.feature_names}
        pred = self.inference(model_input)
        pred = pred[:, 0].numpy()
        return pred

    def _column_mapping(self, X):
        symbols = (
            "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
            "abvgdeejzijklmnoprstufhzcss_y_euaABVGDEEJZIJKLMNOPRSTUFHZCSS_Y_EUA",
        )

        tr = {ord(a): ord(b) for a, b in zip(*symbols)}

        self.columns_mapping = dict(
            zip(
                X.columns,
                [
                    col.translate(tr).replace(" ", "_").replace("$", "dollar")
                    for col in X.columns
                ],
            )
        )

    @tf.function()
    def inference(self, test_model_input):
        return self.model(test_model_input)

    def save_model(self):
        self.model.save_weights("backend/data/DeepFM_w.h5")
        with open("backend/data/DeepFM_data.pkl", "wb") as f_out:
            pickle.dump(
                (
                    self.columns_mapping,
                    self.min_max_scaler,
                    self.dense_features,
                    self.fixlen_feature_columns,
                    self.feature_names,
                ),
                f_out,
            )

    def load_model(self):
        with open("data/DeepFM_data.pkl", "rb") as f_in:
            (
                self.columns_mapping,
                self.min_max_scaler,
                self.dense_features,
                self.fixlen_feature_columns,
                self.feature_names,
            ) = pickle.load(f_in)
        self.model = DeepFM(
            self.fixlen_feature_columns, self.fixlen_feature_columns, task="binary"
        )
        self.model.compile(
            "adam",
            "binary_crossentropy",
            metrics=["binary_crossentropy"],
        )
        self.model.load_weights("data/DeepFM_w.h5")
