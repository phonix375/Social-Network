const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: [
                function () {
                    return !this.reactionBody;
                },
                `Reaction body can't be empty`
            ],
            max: 280,
            min: 1
        },
        username: {
            type: String,
            required: [
                function () {
                    return !this.username;
                },
                `username can't be empty`
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [
                function () {
                    return !this.thoughtText;
                },
                `thought Text can't be empty`
            ],
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [
                function () {
                    return !this.username;
                },
                `username can't be empty`
            ]
        },
        reactions: [ReactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    });

    const Thought = model('Thought', ThoughtSchema);

    module.exports = Thought;

