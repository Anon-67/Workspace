# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times {User.create(username: Faker::Name.unique.first_name, password: "password", password_confirmation: "password", is_admin: true)}


Resource.create(body: "https://www.linkedin.com/in/stefan-inman/", user_id: 1)
Resource.create(body: "https://github.com/Anon-67", user_id: 1)
Resource.create(body: "https://developer.mozilla.org/en-US/", user_id: 1)
Resource.create(body: "https://leetcode.com/", user_id: 1)
Resource.create(body: "https://www.hackerrank.com/", user_id: 1)
Resource.create(body: "https://stackoverflow.com/", user_id: 1)