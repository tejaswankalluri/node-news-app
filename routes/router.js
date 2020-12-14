const express = require("express")
const router = express()
const templatepath = require("app-root-path").resolve("/template/views")
const fetch = require("node-fetch")
const countries = require("./countries-min.json")
const apikey = process.env.APIKEY
router.set("views", templatepath)

router.get("/", async (req, res) => {
    let newsList
    fetch(`
    https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`)
        .then((res) => res.json())
        .then((body) => {
            newsList = body.articles
            res.render("index", { newsList, countries })
        })
        .catch((err) => res.redirect("/error/comelater"))
})
router.get("/:id", async (req, res) => {
    let newsList
    const countryid = req.params.id
    fetch(`
    https://newsapi.org/v2/top-headlines?country=${countryid}&apiKey=${apikey}`)
        .then((res) => res.json())
        .then((body) => {
            newsList = body.articles
            res.render("index", { newsList, countries })
        })
        .catch((err) => res.redirect("/error/comelater"))
})
router.get("/sources/all", (req, res) => {
    fetch(`https://newsapi.org/v2/sources?apiKey=${apikey}`)
        .then((res) => res.json())
        .then((body) => {
            let newsList = body.sources
            res.render("sources", { newsList, countries })
        })
        .catch((err) => res.redirect("/error/comelater"))
})
router.get("/sources/:id", (req, res) => {
    let newsList
    const sourcei = req.params.id
    fetch(
        `https://newsapi.org/v2/top-headlines?sources=${sourcei}&apiKey=${apikey}`
    )
        .then((res) => res.json())
        .then((body) => {
            newsList = body.articles
            let sourcename = body.articles[0].source.name
            res.render("index", { newsList, sourcename })
        })
        .catch((err) => res.redirect("/"))
})
router.get("/s/search", (req, res) => {
    const { q } = req.query
    fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=${apikey}`)
        .then((res) => res.json())
        .then((body) => {
            let newsList = body.articles
            res.render("index", { newsList, countries })
        })
})
router.get("/error/comelater", (req, res) => {
    res.render("comelater", { countries })
})
router.get("/api/countrycode/", (req, res) => {
    res.sendFile("./countries-min.json", { root: "./routes" })
})
module.exports = router
