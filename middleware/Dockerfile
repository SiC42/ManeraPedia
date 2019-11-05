FROM python as build
RUN pip install pipenv
COPY Pipfile* /app/

WORKDIR /app
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt
COPY . /app
ENTRYPOINT [ "python" ]

CMD [ "main.py" ]