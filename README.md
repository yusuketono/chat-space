# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|strings||
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|
|created_at|datetime|null: false|
|update_at|datetime|null: false|


### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|encrypted_password|string|null: false|
|reset_password_token|||
|reset_password_sent_at||
|remenber_created_at|||
|created_at|datetime|null: false|
|update_at|datetime|null: false|
|nickname|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|created_at|datetime|null: false|
|update_at|datetime|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
