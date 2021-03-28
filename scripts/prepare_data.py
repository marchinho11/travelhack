import json
import math
import pickle
from ast import literal_eval as make_tuple

import numpy as np
import pandas as pd
from tqdm import tqdm
from loguru import logger
from sklearn.preprocessing import LabelEncoder


def roundup(x):
    return int(math.ceil(x / 100.0)) * 100


logger.debug("Чтение датафрейма")
df = pd.read_excel("backend/data/dataset.xlsx")

logger.debug("Базовая предобработка")
stars_mapping = {
    "4*": 4,
    "5*": 5,
    "3*": 3,
    "3*-4*": 3.5,
    "HV1": 5,
    "2*": 2,
    "0": 0,
    "3*+": 3.5,
    "-": None,
    "apt": 3,
    "nan": None,
    "HV": 5,
    "4*+": 4.5,
    "Без звёзд": 0,
    "1*": 1,
    "2*super": 3,
    "2*+": 2,
    "HV2": 4,
    "5* Deluxe": 5,
    "Std Apt": 3,
    "BOUTIQUE": 5,
    "Guest House": 3,
    "5*+": 5,
    "2*-3*": 2.5,
    "3*super": 4,
    "S-CLASS": 3.5,
    "cat B": 3,
    "SC": 3.5,
    "4*-5*": 4.5,
    "cat A": 4,
}
feed_mapping = {
    "All Inclusive": "AI",
    "Ultra All Exclusive": "UAI",
    "PREMIUM ALA CARTE ALL INCLUSIVE": "AI",
    "Premium All Inclusive": "AI",
    "Ultimate All Inclusive": "UAI",
    "A'LA CARTE ALL INCLUSIVE": "AI",
    "PALAZZO ALL INCLUSIVE": "AI",
    "PREMIER ULTRA ALL INCLUSIVE": "UAI",
    "PREMIUM ULTRA ALL INCLUSIVE": "UAI",
    "Golden All Inclusive": "UAI",
    "Bed Only": "RO",
    "Полный пансион": "FB",
    "FB + Оздоровит. путевка": "FB",
    "FB + Лечение": "FB",
    "Breakfast": "BB",
    "По программе": "APP",
    "FB + Антистресс": "FB",
    "HB (завтрак+ужин)": "HB",
    "0": None,
    "FB + Отдых": "FB",
    "FB+": "FB",
    "Оздоровительная.": "HB",
    "HB + Оздоровит. путевка": "HB",
    "Полный пансион + Лечение": "FB",
    "Полный Пансион + Смарт путевка": "FB",
    "BB + Оздоровит. путевка": "BB",
    "Полупансион (завтрак+ужин)": "HB",
    "Soft All Inclusive": "AI",
    "Platinum Plan All inclusive": "AI",
    "ULTRA ALL INCLUSIVE PLUS": "UAI",
    "Bed And Breakfast Plus": "BB",
    "FB AI": "AI",
    "ALL IN CONCEPT": "AI",
    "HB+": "HB",
    "AIS": "AI",
    "PRIVILEGED LIFE": "UAI",
    "AI NON ALCOHOL": "AI",
    "LAI": "AI",
    "SUPERIOR ALL INCLUSIVE": "AI",
    "PRE.AI.LIFE STYLE": "FB",
    "ULTRA ALL INCLUSIVE WITH HIGH LEVEL": "UAI",
    "Super All Inclusive": "UAI",
    "As Per Program": "APP",
    "FB + Gala Dinner": "FB",
    "Half Board Premium": "HB",
    "BB+FB": "BB",
    "All Inclusive Ultra": "UAI",
    "HB (завтрак+обед)": "HB",
    "Завтрак": "BB",
    "All Inclusive Aqua": "AI",
    "BB Пляжный": "BB",
    "FB + Общетерапевт.путевка": "FB",
    "BB+HB": "BB",
    "RO + Оздоровительная курсовка": "RO",
    "RO + Оздоровительная путевка": "RO",
    "По программе +": "APP",
    "HB + Лечение": "HB",
    "Al + лечение": "Al",
    "Все включено ПЛЯЖНЫЙ": "Al",
    "Полный пансион + Общетерапевтическая без Мацесты": "FB",
    "Полный пансион + путевка Курортная": "FB",
    "Полный Пансион + Серебряный возраст": "FB",
    "Полный Пансион (шведский стол) + Отдых": "FB",
    "Без питания": "RO",
    "Half Board Platinum": "HB",
    "Half Board Dine Around": "HB",
    "HB Plus": "HB",
    "All Inclusive Dine Around": "AI",
    "Basic All Inclusive": "AI",
    "Diamond AI": "AI",
    "DAI": "AI",
    "Emerald All Inclusive": "AI",
    "Pure Indulgence Dine Around": "UAI",
    "VARU ALL INCLUSIVE": "AI",
    "All Inclusive Lite": "AI",
    "LUXME": "UAI",
    "FBp - Завтрак, обед, ужин (Premium)": "FB",
    "All Inclusive Premium": "AI",
    "Full Board Premium": "FB",
    "PR - Завтрак, ужин (Premium)": "HB",
    "All Inc Ultra Luxury": "UAI",
    "Half board + drinks": "HB",
    "FB Beverage": "FB",
    "Full Board + drinks": "FB",
    "HB Beverage": "HB",
    "AI Light": "AI",
    "Only Bed": "RO",
    "HB AI": "HB",
    "Half Board Beach": "HB",
    "Light All Inclusive": "AI",
    "LAI FB": "FB",
    "Limited all Inclusive": "AI",
    "LAI HB": "HB",
    "Full Board Treatment Relax": "FB",
    "FBT": "FB",
    "Half Board Treatment Relax": "HB",
    "BB Continental": "BB",
    "Все включено СЕМЕЙНЫЙ": "AI",
    "Полный Пансион+Отдых бассейн с термотерапией": "FB",
    "Полный пансион+ Общетерапевтическая Лайт": "FB",
    "Полный пансион + Общетерапевтическая с Мацестой": "FB",
    "FB + Оздоровительная": "FB",
    "FB ресторан «Алтай» + Лечебная путевка": "FB",
    "Serenity Plan": "FB",
    "Gold All Inclusive": "UAI",
    "Crystal Package": "FB",
    "Island Plan All Inclusive": "AI",
    "Full Dine Around All Inclusive": "AI",
    "All inclusive Style": "AI",
}
print(df.head())
df["Тип питания"] = df["Тип питания"].map(feed_mapping)
df["Звездность"] = df["Звездность"].map(stars_mapping)
df["Звездность"] = df["Звездность"].fillna(df["Звездность"].mean())

df["Дата бронирования"] = pd.to_datetime(df["Дата бронирования"])
df["Дата начала тура"] = pd.to_datetime(df["Дата начала тура"])

df["days"] = np.digitize(df["Ночей"], [-1, 3, 7, 11, 250], right=True) - 1
df["season"] = (df["Дата начала тура"].dt.month % 12 + 3) // 3

logger.debug("Label Encoding")
features_categorical = [
    "Пол",
    "Вид тура",
    "Тип заявки",
    "Страна тура",
    "Регион отеля",
    "Состав группы (Заявка) (Заявка)",
    "Тип питания",
    "Город отправления",
    "Город Отеля",
]

features_real = [
    "Возраст клиента",
    "Ночей",
    "Туристов",
    "Туристы, взрослые",
    "Туристы, дети",
    "Младенцы",
    "Сумма в $",
    "Глубина продаж",
    "Звездность",
    "Индекс Биг-Мака",
    "Средняя зарплата",
]
features_categorical_mappers = {}

for col in tqdm(features_categorical):
    label_encoder = LabelEncoder()
    label_encoder.fit(df[col])
    features_categorical_mappers[col] = label_encoder
    df[col] = label_encoder.transform(df[col])

logger.debug("Обогащение")
big_mac_index = pd.read_csv("backend/data/big_mac_index.csv", header=None)
big_mac_index.columns = ["Страна", "Индекс Биг-Мака"]
big_mac_index["Страна"] = features_categorical_mappers["Страна тура"].transform(
    big_mac_index["Страна"]
)

salary_by_city = pd.read_csv("backend/data/zp_by_city.csv", index_col=0)
salary_by_city.columns = ["departure_city", "Средняя зарплата"]
salary_by_city["departure_city"] = features_categorical_mappers[
    "Город отправления"
].transform(salary_by_city["departure_city"])

logger.debug("Фичи для туров")

df_coords = pd.read_csv("backend/data/data_distance_coordinates.csv", index_col=0)

coords_mapping = {}

for name, coords_ in df_coords[["Наименование тура", "hotel_coords"]].values:
    lat, long = make_tuple(coords_)
    coords_mapping[name] = {"lat": lat, "long": long}


def tour_features(df_):
    agg = df_.groupby("Наименование тура").agg(
        {
            "ИД клиента": [len, pd.Series.nunique],
            "Ночей": ["mean", "max", "min", "median"],
            "days": ["mean", "max", "min", "median"],
            "season": ["mean", "max", "min", "median"],
            "Звездность": ["mean", "max", "min", "median"],
            "Сумма в $": ["mean", "max", "min", "median"],
        }
    )
    agg.columns = ["_".join(col) for col in agg.columns]
    agg = agg.reset_index()
    features = df_[["Наименование тура", "Страна тура"]].drop_duplicates().dropna()

    res = pd.merge(agg, features, on="Наименование тура", how="left")
    res = pd.merge(
        res, big_mac_index, left_on="Страна тура", right_on="Страна", how="left"
    )

    tour_info_ = df_[["Наименование тура", "Страна тура"]].drop_duplicates().dropna()
    tour_info_ = pd.merge(tour_info_, agg, on="Наименование тура", how="left")
    tour_info_["Страна тура"] = features_categorical_mappers[
        "Страна тура"
    ].inverse_transform(tour_info_["Страна тура"])
    tour_info_ = tour_info_[
        [
            "Наименование тура",
            "Страна тура",
            "Звездность_mean",
            "Сумма в $_mean",
        ]
    ].fillna("")
    tour_info_["Сумма в $_mean"] = tour_info_["Сумма в $_mean"].apply(
        lambda x: roundup(x)
    )
    tour_info_.columns = ["name", "country", "stars", "price"]
    tour_info_ = json.loads(tour_info_.to_json(force_ascii=False, orient="records"))

    for tour in tour_info_:
        if tour["name"] in coords_mapping:
            tour["lat"] = coords_mapping[tour["name"]]["lat"]
            tour["long"] = coords_mapping[tour["name"]]["long"]
        else:
            tour["lat"] = None
            tour["long"] = None

    tour_info_ = json.dumps(tour_info_)

    res.fillna(res.mean(), inplace=True)
    cat_features = [
        "Страна",
        "Страна тура",
    ]
    res[cat_features] = res[cat_features].astype("int")
    res.columns = [
        "tour_" + col if col != "Наименование тура" else col for col in res.columns
    ]
    return res, tour_info_


df_tour, tour_info_ = tour_features(df)
with open("backend/data/tours_info.json", "w") as f_out:
    f_out.write(tour_info_)

logger.debug("Фичи для юзеров")


def user_features(df_):
    agg = (
        df_.sort_values(by="Дата бронирования")
        .groupby(["ИД клиента"])
        .agg(
            {
                "Ночей": ["min", "max", "mean", "last"],
                "Туристов": ["min", "max", "mean", "last"],
                "Звездность": ["min", "max", "mean", "last"],
                "Сумма в $": ["min", "max", "mean", "last"],
                "Глубина продаж": ["min", "max", "mean", "last"],
                "Тип заявки": "last",
                "Вид тура": "last",
                "Состав группы (Заявка) (Заявка)": "last",
                "Город отправления": "last",
            }
        )
    )
    agg.columns = ["_".join(col) for col in agg.columns]
    agg = agg.reset_index()

    users_info_ = (
        df[["ИД клиента", "Пол", "Возраст клиента"]].drop_duplicates().dropna()
    )
    users_info_["Пол"] = features_categorical_mappers["Пол"].inverse_transform(
        users_info_["Пол"]
    )
    users_info_.columns = ["user_id", "gender", "age"]
    users_info_ = users_info_.to_json(force_ascii=False, orient="records")

    agg.fillna(agg.mean(), inplace=True)

    cat_features = [
        "Вид тура_last",
        "Звездность_last",
        "Тип заявки_last",
    ]
    agg[cat_features] = agg[cat_features].astype("int")
    agg.columns = ["user_" + col if col != "ИД клиента" else col for col in agg.columns]
    return agg, users_info_


df_user, users_info_ = user_features(df)
with open("backend/data/users_info.json", "w") as f_out:
    f_out.write(users_info_)

logger.debug("Данные для обучения ранжированию")


def visited(df):
    df_ = df[["ИД клиента", "Страна тура"]]
    grouped = df_.groupby("ИД клиента")
    res = grouped.aggregate(lambda x: list(set(x)))
    dict_ = res.T.to_dict(orient="records")[0]
    return dict_


visited_countries = visited(df)
with open("backend/data/visited_countries.json", "w") as f_out:
    json.dump(visited_countries, f_out)


def ranking_data(df_):
    tour_country = set(map(tuple, df_[["Страна тура", "Наименование тура"]].values))
    data = []

    for user_id, tour_name in tqdm(df_[["ИД клиента", "Наименование тура"]].values):
        data.append((user_id, tour_name, 1))

        user_countries = set(df_.loc[df["ИД клиента"] == user_id, "Страна тура"])
        for _, tour_name_ in list(
            filter(lambda x: x[0] not in user_countries, tour_country)
        )[:5]:
            data.append((user_id, tour_name_, 0))

    res = pd.DataFrame(data, columns=["ИД клиента", "Наименование тура", "target"])
    return res


df_ranking = ranking_data(df)
df_ranking = pd.merge(df_ranking, df_user, on="ИД клиента")
df_ranking = pd.merge(df_ranking, df_tour, on="Наименование тура")

X = df_ranking[
    df_ranking.columns.difference(
        [
            "ИД клиента",
            "Наименование тура",
            "ИД клиента_nunique",
            "ИД клиента_len",
            "Ночей_mean_y",
            "target",
        ]
    )
]
y = df_ranking["target"].values
logger.debug("Сохранение данных")
X.to_csv("backend/data/ranking_x.csv")
df_user.to_csv("backend/data/df_user.csv")
df_tour.to_csv("backend/data/df_tour.csv")
with open("backend/data/ranking_y.pkl", "wb") as f_out:
    pickle.dump(y, f_out)

with open("backend/data/features_categorical_mappers.pkl", "wb") as f_out:
    pickle.dump(features_categorical_mappers, f_out)
