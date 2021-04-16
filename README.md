<img src="pic/logo.png" height="100" style="border-radius: 50%">

![](https://img.shields.io/badge/React-black?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVQ4y2NQUlL6TwlmQOYoamr/52+b85+/fc5/WXtXuLiMk8d//q4F//lbZ/1XVNfAbYBwcct/yaDY/3LmNv/5+pb9Fy5s+i9c0vafr3vRf3kT8/8SUan/RbKrcBsA0qSgpQPncy3c8597/k44X97Q5D9/xzzcBgi0zPwvZ2YFZovH5/4XaJz6X6B5xn/xmEywmKyV/X/B+snYDQBp5Jm+/j/niqP/OZcf/s++5cp/vv5lYMy27dp/rqUH/3OuPPafd/Lq//LG5kgGKCsDTZ0EVLj8v2Rw7H/eiSv+805ZAw4Haa/g/9IegUCbHYDiK//zTlr9XzIkHkwLVfZADBBNLf4vml4GN5Fn2nqwM6WAmhmu/wNjaTc/oFemg22HqRPJq/svlpD7n0Espei/aGYFmgGT/kt7BkIMuPb3v4yrD8SAqWsRBuTXA8MpB+aFyf/5ehf/l/ILhzh1ylqIF9z9/ksDNcsBAw8sPmEF0AtxQC+sRHgBHoiWdv+5Z28FBxTn8iP/2bcCA7FvKRizbbv6n3PZIWAAH/nPM2Pjf3lTSzzRaAqJRpD/BBqngV0HYoMtAWoUAKZG3AkJGGWKWtpwPvfc7eDEBOMr6OiBvUogKceA45m/cz7Yn0JlHeB8IG9s9l8iPAkc+rgzE9B2/va5YA0yzl6IzARk83UvBGa02f8VNTRxG0AG/gcANyK/UCOM6QAAAAAASUVORK5CYII=)
![](https://img.shields.io/badge/FastAPI-black?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB80lEQVRYR+2WPUvDUBSG31trLbRUB+3k5OQkuDk5uTm4+QMcbE0FRaS9mRqwmGhxKTQpLv4Adxd/gYub4NRJFwcV/GrF5kqKwdLmfiQgRWjWnPue57znnOQSDPkhQ86PEUA0B+rWOQjW+tp3BY0uA2Bh2qoOUDucQTx2ryTOcIIC1VVi1QBs61NFbCBGownZOTlA1OR+5ulWGusGtwAxgEpyr0pZnMAJPoBtvgFkXGKhC40mpQCeCAdCAKDQd19U5oAHEE8sYnPvpr+gYADbfAHIhKT6d2h0qhujAsBxgQMQovp/BUCwgy3q9Do76MBpdQVfnQuh/bL95rekCY3OiwEa1gFclLgADHco0Dnue9tsA4Q/3H3wg4H20S7AjrkJolfvSbag0YzYgWo1hVTnKRiAXUPTl/jVS4aXsUsU9FUxQJipjsFEnpZ/BAlsqy2cnYdWBobR+hsAlW9BQPuCh8WximCoyP5k6HVACsA+oOmTal9C1Tb4ALbl2RqLsrr8dakbaZDko1D0F0B8X3DZGbb1XJCW+HfsWA0wbHAhPACXUeHeB6yefAh7IxyzAkaKgRBdAPCvXgzPKNCsyEX5jcg7bRgJZJOv0qHsDRiLLyC3fys7owbgq9SOZhFnTfFckDLyJVOW2H8fDkBVNUTcCGDkwDfkJqUheIGY3AAAAABJRU5ErkJggg==)

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
![](https://img.shields.io/badge/code_style-isort-black)
![](https://img.shields.io/badge/code_style-autoflake-black)

## Сервис персонализированных предложений для сайта туроператора TUI

https://travelhack.moscow/task/tui/

### Описание бизнес-процесса, который хочется улучшить

В настоящий момент на сайте tui.ru не ведется аналитика, которая могла бы позволить делать персонализированные
предложения клиентам. На новом сайте предполагается создание сервиса, позволяющего формировать **индивидуальную
выдачу/подбор** предложений для потенциального туриста.

# 🚀 Запуск сервиса
1. Установить **python3.8** и менеджер пакетов **poetry**. [Как установить poetry](https://python-poetry.org/docs/#osx-linux-bashonwindows-install-instructions)
2. Инициализировать виртуальное окружение и установить зависимости
```bash
poetry shell
poetry install
```
3. Подготовить данные и обучить модели
```bash
make data
make fit
```
4. Собрать docker-образы и запустить все
```bash
make build
make start
```

## ⚙️ Памятка для DS/ML ресерча

Запуск **Jupyter Notebook**:

- установить менеджер зависимостей **poetry**
- `poetry install`
- `make jupyter`

Добавить пакеты (например, `catboost`):

- если `catboost` нужен на бэкенде, то `poetry add catboost`
- если `catboost` нужен только при ресерче в Jupyter Notebook, то `poetry add catboost --dev`

Удалить пакет
`poetry remove catboost`
