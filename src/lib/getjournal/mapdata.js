/*
In the folder 

public/data/journal
have a bunch of files in .mdx format that are the journal entries.
they are organized by date: dd_mm_yyyy.mdx 

This code will read all the files in that folder and return an array of objects in chronological order.

[
    "data/journal/01_01_2020.mdx",
    "data/journal/01_02_2020.mdx",
    "data/journal/01_03_2020.mdx",
    ...
]

this will be used for the main journal page retrieval and rendering the journal entries in order.
*/ 

import fs from 'fs'
import path from 'path'

const journalDir = path.join(process.cwd(), 'public/data/journal')

function makePath(path){
    // path is something like data/journal/01_01_2020.mdx
    // cut all before data and replace \ with /
    const pathArray = path.split('\\')
    const pathIndex = pathArray.indexOf('data')
    const pathArray2 = pathArray.slice(pathIndex)
    const pathString = pathArray2.join('/')
    return pathString
}

function readJournal(){
    const fileNames = fs.readdirSync(journalDir)
    const allJournal = fileNames.map(fileName => {
        const fullPath = path.join(journalDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        return {
            fileName,
            localpath: fullPath,
            fileContents,
            contentpath: makePath(fullPath)
        }
    })
    return allJournal
}

function sortJournal(journal){
    const sortedJournal = journal.sort((a, b) => {
        const aDate = new Date(a.fileName.replace('.mdx', ''))
        const bDate = new Date(b.fileName.replace('.mdx', ''))
        return bDate - aDate
    })
    return sortedJournal
}

function getJournal(){
    const journal = readJournal()
    const sortedJournal = sortJournal(journal)
    return sortedJournal
}

export default getJournal;