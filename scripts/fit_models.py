import pickle

import pandas as pd
from catboost import CatBoostClassifier, Pool
from loguru import logger
from sklearn.model_selection import train_test_split

logger.debug("Чтение данных")
X = pd.read_csv("backend/data/ranking_x.csv")
with open("backend/data/ranking_y.pkl", "rb") as f_in:
    y = pickle.load(f_in)

logger.debug("Сплит")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, test_size=0.2, random_state=42, shuffle=True
)

logger.debug("Обучение")
cat_features = [
    "Вид тура_last",
    "Звездность_last",
    "Страна",
    "Страна тура",
    "Тип заявки_last",
]
cat_features_indexes = [list(X.columns).index(col) for col in cat_features]

train_pool = Pool(X_train, y_train, cat_features=cat_features_indexes)
val_pool = Pool(X_test, y_test, cat_features=cat_features_indexes)
model = CatBoostClassifier(n_estimators=10, depth=3, l2_leaf_reg=5)
model.fit(train_pool, eval_set=val_pool)

logger.debug("Сохранение модели")
with open("backend/data/ranker.pkl", "wb") as f_out:
    pickle.dump(model, f_out)
