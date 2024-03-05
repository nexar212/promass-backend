import { getConnection } from "../database/connection.js";
import sql from 'mssql';

// Obtiene todos los posts
export const getPosts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT ID, Titulo, Autor, FechaPublicacion, Contenido 
            FROM Posts 
            ORDER BY FechaPublicacion DESC
        `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts.' });
    }
};

// Obtiene un post por su ID
export const getOnePost = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID', sql.BigInt, req.params.id)
            .query(`
                SELECT ID, Titulo, Autor, FechaPublicacion, Contenido 
                FROM Posts 
                WHERE ID = @ID
            `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el post.' });
    }
};

// Crea un nuevo post
export const createPost = async (req, res) => {
    try {
        const { Titulo, Autor, Contenido } = req.body;

        if (!Titulo || !Autor || !Contenido) {
            return res.status(400).json({ error: 'Se requieren todos los campos.' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('Titulo', sql.VarChar, Titulo)
            .input('Autor', sql.VarChar, Autor)
            .input('Contenido', sql.VarChar, Contenido)
            .query(`
                INSERT INTO Posts (Titulo, Autor, FechaPublicacion, Contenido) 
                VALUES (@Titulo, @Autor, GETDATE(), @Contenido)
            `);

        console.log(result);
        res.json({ msj: 'Post creado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el post.' });
    }
};