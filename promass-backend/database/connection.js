import sql from 'mssql'

// const sql = require('mssql')
const dbSettings = {
    user: 'promass-user', 
    password: 'password',
    server: 'localhost', 
    port: 1433,
    database: 'promass', 
    options: {
      encrypt: true, 
      trustServerCertificate: true 
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);

        const tableCheckQuery = `
            IF NOT EXISTS (
                SELECT 1
                FROM INFORMATION_SCHEMA.TABLES 
                WHERE TABLE_TYPE='BASE TABLE' 
                AND TABLE_NAME='Posts'
            )
            BEGIN
                CREATE TABLE Posts (
                    Id INT PRIMARY KEY IDENTITY,
                    Titulo NVARCHAR(255) NOT NULL,
                    Autor NVARCHAR(150) NOT NULL,
                    FechaPublicacion DATETIME NOT NULL,
                    Contenido NVARCHAR(MAX) NOT NULL
                );

                INSERT INTO Posts (Titulo, Autor, FechaPublicacion, Contenido)
                VALUES 
                ('February’s Fever: Earth’s Relentless Warmth Continues','Ricky Lanusse', GETDATE(), 'The trend of record-breaking temperatures from 2023 has been followed by the warmest ever January, as global average surface air and ocean temperatures persist at elevated levels. As human-induced global heating collides with the natural climate phenomenon of El Niño, the result is a planetary temperature trajectory that shows no signs of slowing down. In fact, NOAA has stipulated that this year has a one in three chance of being even hotter than last year’s record.'),
                ('The 5 ChatGPT Prompts That Represent the State of Coding in 2024', 'The Secret Developer', GETDATE(), '2023 was the year that AI is blowing up, right? The Secret Developer has been using prompts to improve their codebase all year and has learned one or two things about getting good responses from AI. So, in the fullest spirit of fun let us look at five prompts that captured the state of tech in 2023. Remember, these are just for laughs, so don’t get your code spaghetti! This is a variation on deciding that the whole project should be deleted. After the advent of AI everyone and their grandma feel that they can use AI to magic up a fully functional application.'),
                ('Stagger Lee and the ‘Erasure’ of Middle-Class African Americans', 'Andrew Jazprose Hill', GETDATE(), 'The year is 1958. I am 10 years old, leaning against the floor-standing woodgrain radio whose music has set my entire household in motion.

                The man on the radio is Lloyd Price, and he is singing about a legendary figure, the seriously bad nigga known as Stagger Lee. We don’t know that this song is based on a real-life figure from the late 19th and early 20th-century, whose name was Lee Shelton — defined online as an American criminal. My mother, who has been dead 10 years as I write this, is still a honey-hued beauty in her thirties in 1958. When that song begins to play, she flies from the kitchen, turns up the volume, claps her hands — and begins to dance.');
            END`;

            await pool.request().query(tableCheckQuery);
        return pool
    } catch (error) {
        console.error(error)
    }
}