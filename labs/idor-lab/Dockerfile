# Usa a imagem base Python 3.11 slim
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o requirements.txt para o container
COPY requirements.txt .

# Atualiza o pip antes de instalar dependências
RUN python -m pip install --upgrade pip

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o diretório da aplicação
COPY app/ ./app

# Expõe a porta que o Flask vai usar
EXPOSE 5000

# Comando para rodar a aplicação
ENV PYTHONPATH=/app
CMD ["python", "app/run.py"]
