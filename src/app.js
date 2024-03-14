const PUERTO= 8080
const express= require ("express")
const app= express ();
app.get ("/", (req, res) => {
    res.send("mi primera chamba con express")
})
app.listen (PUERTO, () => {
    console.log (`escuchando el puerto ${PUERTO}`)
})