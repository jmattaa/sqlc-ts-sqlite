// Code generated by sqlc. DO NOT EDIT.

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Database } from "better-sqlite3";

export const getAuthorQuery = `-- name: GetAuthor :one
SELECT id, name, some_ting, bio FROM authors
WHERE id = ? LIMIT 1`;

export interface GetAuthorArgs {
    id: any;
}

export interface GetAuthorRow {
    id: any;
    name: any;
    some_ting: any | null;
    bio: any | null;
}

export async function getAuthor(database: Database, args: GetAuthorArgs): Promise<GetAuthorRow | null> {
    const stmt = database.prepare(getAuthorQuery);
    const result = await stmt.get(args.id);
    if (result == undefined) {
        return null;
    }
    return result as GetAuthorRow;
}

export const listAuthorsQuery = `-- name: ListAuthors :many
SELECT id, name, some_ting, bio FROM authors
ORDER BY name`;

export interface ListAuthorsRow {
    id: any;
    name: any;
    some_ting: any | null;
    bio: any | null;
}

export async function listAuthors(database: Database): Promise<ListAuthorsRow[]> {
    const stmt = database.prepare(listAuthorsQuery);
    const result = await stmt.all();
    return result as ListAuthorsRow[];
}

export const createAuthorQuery = `-- name: CreateAuthor :exec
INSERT INTO authors (
  name, bio, some_ting
) VALUES (
  ?, ?, ?
)`;

export interface CreateAuthorArgs {
    name: any;
    bio: any | null;
    some_ting: any | null;
}

export async function createAuthor(database: Database, args: CreateAuthorArgs): Promise<void> {
    const stmt = database.prepare(createAuthorQuery);
    await stmt.run(args.name, args.bio, args.some_ting);
}

export const updateAuthorQuery = `-- name: UpdateAuthor :one
UPDATE authors
SET name = ?, bio = ?
WHERE id = ?
RETURNING id, name, some_ting, bio`;

export interface UpdateAuthorArgs {
    name: any;
    bio: any | null;
    id: any;
}

export interface UpdateAuthorRow {
    id: any;
    name: any;
    some_ting: any | null;
    bio: any | null;
}

export async function updateAuthor(database: Database, args: UpdateAuthorArgs): Promise<UpdateAuthorRow | null> {
    const stmt = database.prepare(updateAuthorQuery);
    const result = await stmt.get(args.name, args.bio, args.id);
    if (result == undefined) {
        return null;
    }
    return result as UpdateAuthorRow;
}

export const deleteAuthorQuery = `-- name: DeleteAuthor :exec
DELETE FROM authors
WHERE id = ?`;

export interface DeleteAuthorArgs {
    id: any;
}

export async function deleteAuthor(database: Database, args: DeleteAuthorArgs): Promise<void> {
    const stmt = database.prepare(deleteAuthorQuery);
    await stmt.run(args.id);
}

