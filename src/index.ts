import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes";
import editorialRouter from './routes/editorialRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api", bookRoutes);
app.use("/api", editorialRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
