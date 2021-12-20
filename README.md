# server-side
# Server-side

# Event's Web Application

# User Story:

- User sign up with this information [ email, full name, password, phone number]
- User can sign up with Google.
- User sign in with [ email, password ]
- User can reset his password by sending email with code/link to him.

- There is two type of events:

  - **Events**
    In public event case the creator can choose selling tickets or give it for free. Also the guest can send donation to event creator like a supporting for a charity events.
  - **Private Event**
    Event creator send a ticket dirctiry to guest email.

- User can create his event page by filling this informaion:
  - Title
  - Short discription
  - Long discription (not required)
  - Photos like : logo, event photo.
  - choose color of his page. (not required)
  - Location
  - Contact number
  - Begging and end date
  - Begging and end time
  - Choose type of event.
  - User can edit or delete event page.
- After user done of create his event page he should send an order for admin to confirme his event. (user can delete event order)

- **After Admin confirmation** :

  - **In case: event type was a private**

    - User can set guest emails and send invitation email to them.

  - **In case: event type was a special**
    - User can see public event page without have an account.
    - User can buy a ticket only when he register and logged in.
    - After user decide to buy a ticket and pay for it he will recive email ticket.

- The invitation email contains:

  - QR ticket (expired by the end of event)
  - Invation letter
  - Event Date and time
  - Event page like that was created by event creator.(When guest open link he will be able to see event page)

- Creator event user will have link for read/scan QR ticket.(This link used at door of event location to let guset enter if it is verfied)
- Creator event user have table for guest that contains two rows: "email" filled by guest email, and "came" filled by yes or no.
- In admin dashboard there is bar chart showing analisis of response rate in each event in application. Values computed referring to data achieved from event's geust.
- Admin can delete any event in any time, and block and unblock user account.

  ***

  # Trello link :

  ## [Trello](https://trello.com/b/xefVOZOx/master-piece-project)

---
# UML Diagram:

## ![UML](https://github.com/MP-Project-Suha/server-side/blob/main/images/UML.png)
---

## Routers:
### Role ROUTERS:

| HTTP Method | URL | Request Body | Request Params | Permissions | Success Status | Error status | Description |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| post | /role | {role,permissions} |  | private `authanication`, `autharization` | 201 | 400 | create new role by admin |
| get | /roles |  |  | private `authanication`, `autharization` | 200 | 400 | get all roles by admin |


### USER ROUTERS:

| HTTP Method | URL | Request Body | Request Params | Permissions | Success Status | Error status | Description |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------------------- |
| post |  /register | {firstName, lastName, email, password, role } | |  public |  201 | 400  | create new user                                    |
| post |  /login | {email, password } |  | public | 201 | 404 | login for exist user                               |
| post | /googlelogin |  |  |   public | 201 | 404 | login with google or create new uset by google |
| post | /forgetPassword | {email} |   | public | 201 | 404 | search for email in DB then send link to user      |
| put | /restPassword | {password} |  | public | 201 | 404 | update user password                               |
| put | /verfiyAccount/:\_id/:token |  | {\_id , token } |   public | 201 | 404  | verify account                                     |
| put | /profile/:id | {firstName, lastName, avatar, email, password} |  id |  private `authanication` | 201 | 404 | update user informations also soft delete for user |
| get | /profile/:id |  | id |  private `authanication` | 200 | 404 | get user informations                              |
| get | /users |  | n| private `authanication`, `autharization` | 200 | 404 | get all user - admin only                          |
| get | /user/:id |  | id | private `authanication`, `autharization` | 200 | 404 | get user informations - admin only                 |
| delete | /user/:id |  | id | private `authanication`, `autharization` | 200 | 404 | get user informations - admin only                 |

---

### EVENTS ROUTERS:

| HTTP Method |         URL          |                                         Request Body                                         | Request Params |                             Permissions | Success Status | Error status | Description                                                  |
| :---------- | :------------------: | :------------------------------------------------------------------------------------------: | :------------: | --------------------------------------: | -----------: | :------------- | :----------------------------------------------------------- |
| get         |       /events        |                                                                                              |                |                                  public |          200 | 400            | get public events                                            |
| get         |     /event/:\_id     |                                                                                              |                |                                  public |          201 | 404            | get public event                                             |
| get         | /penddingEvent/:\_id |                                                                                              |     {\_id}     |                 private `authanication` |          200 | 404            | get pending event that wait to be approved from admin        |
| get         |   /penddingEvents    |                                                                                              |                |                 private `authanication` |          200 | 404            | get all pending events that wait to be approved from admin   |
| get         |   /userEvent/:\_id   |                                                                                              |     {\_id}     |                 private `authanication` |          200 | 404            | get private event of user that approved ready for share      |
| get         |     /userEvents      |                                                                                              |                |                 private `authanication` |          200 | 404            | get all private events of user that approved ready for share |
| post        |   /userEvent/:\_id   | {title, shortDisc, longDisc, images, dateBegin, dateEnd, timeBegin, timeEnd,location , cost} |     {\_id}     |                 private `authanication` |          201 | 404            | get private event of user that approved ready for share      |
| put         |   /userEvent/:\_id   | {title, shortDisc, longDisc, images, dateBegin, dateEnd, timeBegin, timeEnd,location , cost} |     {\_id}     |                 private `authanication` |          201 | 404            | get private event of user that approved ready for share      |
| delete      |   /userEvent/:\_id   |                                                                                              |     {\_id}     |                 private `authanication` |          200 | 404            | soft delete for event of user                                |
| put         | /verfiedEvent/:\_id  |                                                                                              |     {\_id}     | private `authanication`,`autharization` |          201 | 404            | login with google or create new uset by google               |
| delete      |  /deleteEvent/:\_id  |                                                                                              |     {\_id}     | private `authanication`,`autharization` |          200 | 404            | search for email in DB then send link to user                |

---

### TICKETS ROUTERS:

| HTTP Method |         URL          | Request Body | Request Params |                             Permissions | Success Status | Error status | Description                                       |
| :---------- | :------------------: | :----------: | :------------: | --------------------------------------: | -----------: | :------------- | :------------------------------------------------ |
| get         | /penddingTickt/:\_id |              |     {\_id}     |                 private `authanication` |          200 | 404            | get pending ticket (payment pending)              |
| get         |   /penddingTickts    |              |                |                 private `authanication` |          200 | 404            | get all pending tickets of user (payment pending) |
| get         |    /ticket/:\_id     |              |     {\_id}     |                 private `authanication` |          200 | 404            | get ticket of user                                |
| post        |     /ticket/:\_id     |     |     {\_id}     |                 private `authanication` |          201 | 404            | creat ticket                                      |
| put         |     /ticket:\_id     |              |     {\_id}     |                 private `authanication` |          201 | 404            | delete ticket by creator of event                 |
| post        | /ticketByAdmin/:\_id |              |     {\_id}     | private `authanication`,`autharization` |          201 | 404            | create ticket by admin                            |
| delete      | /ticketByAdmin/:\_id |              |     {\_id}     | private `authanication`,`autharization` |          200 | 404            | delete ticket by admin                            |

---

### RATING ROUTERS:

| HTTP Method |      URL      | Request Body | Request Params |             Permissions | Success Status | Error status | Description               |
| :---------- | :-----------: | :----------: | :------------: | ----------------------: | -----------: | :------------- | :------------------------ |
| get         | /rates/:\_id |              |     {\_id}     | private `authanication` |          200 | 404            | get rating of the event   |
| post        | /rate/:\_id  |    {rate}      |                | private `authanication` |          201 | 404            | create rate for the event |

---

### Order ROUTERS:

| HTTP Method | URL | Request Body | Request Params | Permissions | Success Status | Error status | Description |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| post | /order | {order, total} |  | private `authanication`,  | 201 | 400 | create orders |
| get | /order/id |  |  | private `authanication` | 200 | 400 | get order |



---


# Modules:

### Role Module:

| Name       | Required           | Unique             | Defult | Refrence | Type   |
| ---------- | ------------------ | ------------------ | ------ | -------- | ------ |
| role       | :white_check_mark: | :white_check_mark: |        |          | String |
| permission | :white_check_mark: |                    |        |          | Array  |

---

### User Module:

| Name      | Required           | Unique            | Defult | Refrence | Type    |
| --------- | ------------------ | ----------------- | ------ | -------- | ------- |
| firstName | :white_check_mark: |                   |        |          | String  |
| lastName  | :white_check_mark: |                   |        |          | String  |
| email     | :white_check_mark: | :white_check_mark: |       |         | String  |
| password  | :white_check_mark: |                   |        |          | String  |
| avatar    |                    |                   |        |          | String  |
| role      | :white_check_mark: |                   |        | Role     |         |
| isVerfied | :white_check_mark: |                   | false  |          | Boolean |
| isDele    | :white_check_mark: |                   | false  |          | Boolean |

---

### Event Module:

| Name      | Required           | Unique | Defult   | Refrence | Type    |
| --------- | ------------------ | ------ | -------- | -------- | ------- |
| title     | :white_check_mark: |        |          |          | String  |
| shortDisc | :white_check_mark: |        |          |          | String  |
| longDisc  |                    |        |          |          | String  |
| images    | :white_check_mark: |        |          |          | Array   |
| location  | :white_check_mark: |        |          |          | String  |
| createdBy | :white_check_mark: |        |          | User     |         |
| createdAt | :white_check_mark: |        | Now Date |          | Date    |
| biginAt | :white_check_mark: |        |          |          | Date    |
| endAt   | :white_check_mark: |        |          |          | Date    |
| isVerfied | :white_check_mark: |        | false    |          | Boolean |
| isDele    | :white_check_mark: |        | false    |          | Boolean |
| price      | :white_check_mark: |        |          |          | String  |

---

### Ticket Module:

| Name      | Required           | Unique | Defult | Refrence | Type    |
| --------- | ------------------ | ------ | ------ | -------- | ------- |
| event     | :white_check_mark: |        |        |  Event   |         |
| createdBy | :white_check_mark: |        |        |  User    |         |
| isVerfied | :white_check_mark: |        | false  |          | Boolean |
| isDele    | :white_check_mark: |        | false  |          | Boolean |
| expired   | :white_check_mark: |        | false  |          | Boolean |

---

### Rating Module:

| Name      | Required           | Unique | Defult | Refrence | Type    |
| --------- | ------------------ | ------ | ------ | -------- | ------- |
| rate      | :white_check_mark: |        |        |          | Number  |
| event     | :white_check_mark: |        |        | Event    |         |
| createdBy | :white_check_mark: |        |        | User     |         |


---

### Order Module:order, isVerfied , total

| Name      | Required           | Unique | Defult | Refrence | Type    |
| --------- | ------------------ | ------ | ------ | -------- | ------- |
| tickets     | :white_check_mark: |        |        |     |   Array      |
| total     | :white_check_mark: |        |        |     | Number |
| createdBy | :white_check_mark: |        |        | User     |         |
| createdAt | :white_check_mark: |        |        |     | Date   |
| isVerfied    | :white_check_mark: |        | false  |          | Boolean |
| isDele    | :white_check_mark: |        | false  |          | Boolean |
| expired    | :white_check_mark: |        | false  |          | Boolean |
---

# ER Digram:

![ERD](https://github.com/MP-Project-Suha/server-side/blob/main/images/ERD.png)

---
## Links:
* [Trello](https://trello.com/b/xefVOZOx/master-piece-project)
* [Deploy](#)
* [Client-Side](https://github.com/MP-Project-Suha/Client-side)
* [Slides](#)
