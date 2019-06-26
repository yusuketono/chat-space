## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user|reference|null: false,foreign_key: true|
|group|reference|null: false,foreign_key: true|

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
|nickname|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through: :members


## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false,foreign_key: true|
|group|reference|null: false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
