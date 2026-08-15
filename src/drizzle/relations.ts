import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),
    clubOwnerships: r.many.ClubTable({
      from: r.UserTable.id,
      to: r.ClubTable.ownerId,
    }),
    clubMemberships: r.many.ClubMemberTable({
      from: r.UserTable.id,
      to: r.ClubMemberTable.memberId,
    }),
    posts: r.many.PostTable({
      from: r.UserTable.id,
      to: r.PostTable.authorId,
    }),
  },
  SessionTable: {
    user: r.one.UserTable({
      from: r.SessionTable.userId,
      to: r.UserTable.id,
    }),
  },

  ClubTable: {
    owner: r.one.UserTable({
      from: r.ClubTable.ownerId,
      to: r.UserTable.id,
    }),
    members: r.many.ClubMemberTable({
      from: r.ClubTable.id,
      to: r.ClubMemberTable.clubId,
    }),
    posts: r.many.PostTable({
      from: r.ClubTable.id,
      to: r.PostTable.clubId,
    }),
  },
  ClubMemberTable: {
    user: r.one.UserTable({
      from: r.ClubMemberTable.memberId,
      to: r.UserTable.id,
    }),
    club: r.one.ClubTable({
      from: r.ClubMemberTable.clubId,
      to: r.ClubTable.id,
    }),
  },

  PostTable: {
    author: r.one.UserTable({
      from: r.PostTable.authorId,
      to: r.UserTable.id,
    }),
    club: r.one.ClubTable({
      from: r.PostTable.clubId,
      to: r.ClubTable.id,
    }),
    likes: r.many.PostLikeTable({
      from: r.PostTable.id,
      to: r.PostLikeTable.postId,
    }),
    comments: r.many.PostCommentTable({
      from: r.PostTable.id,
      to: r.PostCommentTable.postId,
    }),
  },
  PostLikeTable: {
    post: r.one.PostTable({
      from: r.PostLikeTable.postId,
      to: r.PostTable.id,
    }),
    user: r.one.UserTable({
      from: r.PostLikeTable.userId,
      to: r.UserTable.id,
    }),
  },
  PostCommentTable: {
    post: r.one.PostTable({
      from: r.PostCommentTable.postId,
      to: r.PostTable.id,
    }),
    user: r.one.UserTable({
      from: r.PostCommentTable.userId,
      to: r.UserTable.id,
    }),
  },
}));
