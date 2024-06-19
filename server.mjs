import express from "express";

//пакет для  защиты CORS (Cross-Origin Resource Sharing) на сервере
import cors from "cors";

//модуль PostgreSQL
import pg from "pg";

const PORT = 3001;

//Создается объект Pool из модуля pg
const { Pool } = pg;

//В конструкторе Pool передается объект с параметрами подключения к базе данных
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db1",
  password: "123",
  port: "5432",
});

const app = express();

app.use(express.json());
app.use(cors());

app.put("/api/translator/write", async (req, res) => {
  const body = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO words1 ("en", "ru") VALUES ($1, $2) RETURNING id`,
      [body.en, body.ru]
    );

    const newWordId = result.rows[0].id;
    res.send({ id: newWordId, en: body.en, ru: body.ru });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/translator/get", async (req, res) => {
  try {
    const data = await pool.query(`select * from words1`);
    //отправка данных в формате json
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/translator/delete", async (req, res) => {
  try {
    const idToDelete = req.body.id;
    await pool.query(`DELETE FROM words1 WHERE id = $1`, [idToDelete]);
    res.status(200).json({ message: "Word deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
