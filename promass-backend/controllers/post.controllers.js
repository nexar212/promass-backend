import { getConnection } from "../database/connection.js"
import sql from 'mssql'

export const getPosts = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request().query('SELECT ID, Titulo, Autor, FechaPublicacion, Contenido FROM Posts')
    res.json(result.recordset)
}

export const getOnePost = async (req, res) => {
    
    console.log(req.params)
    const pool = await getConnection();

    const result = await pool.request()
        .input('ID', sql.BigInt, req.params.id)
        .query('SELECT ID,Titulo, Autor, FechaPublicacion, Contenido FROM Posts WHERE ID = @ID')
    res.json(result.recordset)

}

export const createPost = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('Titulo', sql.VarChar, req.body.Titulo)
        .input('Autor', sql.VarChar, req.body.Autor)
        .input('Contenido', sql.VarChar, req.body.Contenido)
        .query('INSERT INTO Posts (Titulo, Autor, FechaPublicacion, Contenido) VALUES (@Titulo, @Autor, GETDATE(), @Contenido)')

    console.log(result)
    res.json({
        msj: 'Se guardó correctamente',
    })
}