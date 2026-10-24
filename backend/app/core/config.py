from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "KrishiOS AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "fallback_secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 11520

    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "krishios"
    POSTGRES_PORT: str = "5432"

    # Module 3 — Smart Weather Advisory
    OPENWEATHER_API_KEY: str = ""

    # Module 2 — AI Agriculture Assistant
    GEMINI_API_KEY: str = ""

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"

settings = Settings()
