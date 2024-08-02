const enum ApiEndpoints {
    RootPath = "/",
    DataPath = "/api/data",
    IDDataPath = "/api/data/id/:id",
    AllDataPath = "/api/data/all",
    LimitDataPath = "/api/data/limit",
    InsertPath = "/api/insert",
    UpdatePath = "/api/update",
    UpdateDatePath = "/api/update/id/:id/date=:date",
    UpdateAuthorIdPath = "/api/update/id/:id/author_id=:author_id",
    UpdateTitlePath = "/api/update/id/:id/title=:title",
    UpdateDescriptionPath = "/api/update/id/:id/description=:description",
    UpdateContentPath = "/api/update/id/:id/content=:content",
    DeletePath = "/api/delete/id/:id"
}

export default ApiEndpoints;