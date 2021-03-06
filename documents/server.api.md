# Server API

**Table of Contents**

* [**Authentication**](#authentication)
    * [Login](#login)
    * [isLoggedIn](#isloggedin)
    * [Logout](#logout)
    * [Sign Up](#sign-up)
    * [OAuth Sign Up](#oauth-sign-up)
    * [Email Activation](#email-activation)
    * [Authenticate User Action](#authenticate-user-action)
    * [Forgot Password](#forgot-password)
    * [Reset Password](#reset-password)
    * [Change Email](#change-email)
    * [Change Email Request](#change-email-request)
* [**Chat**](#chat)
    * [Get Chat History](#chat-history)
* [**Status**](#Status)
    * [Update Status](#update-status)
    * [Get Status](#get-status)
* [**Data Exchange**](#data-exchange)
    * [Import Data](#import-data)
    * [Export Data](#export-data)
* [**Photos**](#photos)
    * [Home Page Photos](#home-page-photos)
    * [Renovation Photos](#renovation-photos)
    * [Profile Picture](#profile-picture)
* [**Home**](#home)
    * [Upload Ad](#upload-ad)
    * [Delete Ad](#delete-ad)
    * [Get Ads](#get-ads)
    * [Edit Ad](#edit-ad)
* [**Renovations**](#renovations)
    * [Get Renovation Info](#get-renovation-info)
    * [Get All Renovations](#get-all-renovations)
    * [Create Renovation](#create-renovation)
    * [Renovation RSVP](#renovation-rsvp)
    * Renovation Tools
        * [Add Tool](#add-tool)
        * [Assign Tool](#assign-tool)
        * [Unassign Tool](#unassign-tool)
        * [Delete Tool](#delete-tool)
    * Renovation Tasks
        * [Add Task](#add-task)
        * [Assign Task](#assign-task)
        * [Finished Task](#finished-task)
        * [Edit Task](#edit-task)
        * [Delete Task](#delete-task)
    * Renovation Pinned Messages
        * [Add Pinned Message](#add-pinned-message)
        * [Edit Pinned Message](#edit-pinned-message)
        * [Delete Pinned Message](#delete-pinned-message)
    * Renovation Stages
        * [Add Renovation Stage](#add-renovation-stage)
        * [Update Renovation Stage](#update-renovation-stage) 
* [**Users**](#users)
    * [Get User Full Info](#get-user-full-info)
    * [Get User Basic Info](#get-user-basic-info)
    * [Get All Users](#get-all-users)
    * [Get All Sign-ups](#get-all-sign-ups)
    * [Approve User](#approve-user)
    * [Delete User](#delete-user)
    * [Update User Role](#update-user-role)
    * [Update User Data](#update-user-data)
* [**Teams**](#teams)
    * [Create Team](#create-team)
    * [Delete Team](#delete-team)
    * [Get All Teams](#get-all-teams)
    * [Get Team](#get-team)
    * [Add Members](#add-members)
    * [Remove Members](#remove-members)
    * [Assign To Renovation](#assign-to-renovation)
    * [Assign Manager](#assign-manager)
    

---

## Authentication

### Login

#### Request

| Method | Url |
|---|---|
|  POST | /api/auth/login |

| Type  | Params | Values |
|---|---|---|
| BODY  | email | String |
| BODY  | password | String

#### Response

| Status  | Response |
|---|---|
| 200 | { success: true,  name: String, email: String, <br> role: String, phone: String, isOAuth: boolean, <br> approved: boolean, signup_complete: boolean, joined_date: Date ISO String, <br> avatar: img url, renovations: Array, tasks: Array } |
| 400 | {errMessage: "Email or Password are incorrect"} |
| 401 | {data: "Error: User is not logged in", status: 401 } |

---

### isLoggedIn

#### Request

| Method | Url |
|---|---|
|  GET | /api/auth/isLoggedIn |

| Type  | Params | Values |
|---|---|---|
|   |  |  |

#### Response

| Status  | Response |
|---|---|
| 200 | { success: true,  name: String, email: String, <br> role: String, phone: String, isOAuth: boolean, <br> approved: boolean, signup_complete: boolean, joined_date: Date ISO String, <br> avatar: img url, renovations: Array, tasks: Array } |
| 401 | {errMessage: "Error: User is not logged in"} |

---

### Logout

#### Request

| Method | Url |
|---|---|
|  GET | /api/auth/logout |

| Type  | Params | Values |
|---|---|---|
|   |  |  |

#### Response

| Status  | Response |
|---|---|
| 200  |{success: true} |
| 401 | {errMessage: "Error: User is not logged in"} |

---

### Sign Up

#### Request

| Method | Url |
|---|---|
|  POST | /api/auth/signup |

| Type  | Params | Values |
|---|---|---|
|  BODY | email | String |
|  BODY | password | String |
|  BODY | name | String |
|  BODY | phone | String |
|  BODY | area | String |
|  BODY | team_leader | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Please Provide all required fields"} |
| 400 | {errMessage: "User Already Logged In"} |

---

### OAuth Sign Up

#### Request

| Method | Url |
|---|---|
|  POST | /api/auth/signup_oauth |

| Type  | Params | Values |
|---|---|---|
|  BODY | phone | String |
|  BODY | area | String |
|  BODY | team_leader | String |

#### Response

| Status  | Response |
|---|---|
| 200  |{success: true} |
| 400 | {errMessage: "Please Provide all required fields"} |
| 400 | {errMessage: "Sign-Up Process has already been completed"} |

---

### Email Activation

#### Request

| Method | Url |
|---|---|
|  GET | /api/auth/activation/:token |

| Type  | Params | Values |
|---|---|---|
|  PARAMS | token | String |

#### Response

| Status  | Response |
|---|---|
| --  | Redirects to error\success page |

---

### Authenticate User Action
Server assigns action id to request according to passed param

#### Request

| Method | Url |
|---|---|
|  GET | /api/auth/authenticate/:action |

| Type  | Params | Values |
|---|---|---|
|  PARAMS | action | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "No Action ID"} |

---

### Forgot Password

#### Request

| Method | Url |
|---|---|
| POST | /api/auth/forgot |

| Type  | Params | Values |
|---|---|---|
|  BODY | email | String |
|  BODY | old_password | String |
|  BODY | new_password | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: ""} |
| 500 | {errMessage: ""} |

---

### Reset Password

#### Request

| Method | Url |
|---|---|
| GET | /api/auth/reset/:token |

| Type  | Params | Values |
|---|---|---|
|  PARAMS | token | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: ""} |
| 500 | {errMessage: ""} |

---

### Change Email

#### Request

| Method | Url |
|---|---|
| GET| /api/auth/changeEmail/:token |

| Type  | Params | Values |
|---|---|---|
|  PARAMS | token | String |

#### Response

| Status  | Response |
|---|---|
| 200 | redirect to /login |
| 400 | redirect to /result/error/Error has accord , please  try again |
| 400 | redirect to /result/error/invalid token |

---

### Change Email Request

#### Request

| Method | Url |
|---|---|
| POST | /api/auth/changeEmailRequest|

| Type  | Params | Values |
|---|---|---|
|  BODY | oldEmail| String |
|  BODY | newEmail| String |

#### Response

| Status  | Response |
|---|---|
| 200 | redirect to /login |
| 400 | redirect to /result/error/Wrong Email |

---

---

## Chat

### Chat History

#### Request

| Method | Url |
|---|---|
| GET | /api/chat/history/:chatId |

| Type  | Params | Values |
|---|---|---|
|  PARAMS | chatId | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {id: chat_id, messages: [{align: msgSide, class: msgClass, content: msgContent, timestamp: HH:mm, user: username}]} |
| 400 | {errMessage: "Invalid Chat Id"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 500 | {errMessage: "Error getting chat history"} |

---

---

# Status

Endpoints regarding ProjectHands' Referral Receiving Status

### Update Status

#### Request

| Method | Url |
|---|---|
| POST | /api/status/update_status |

| Type  | Params | Values |
|---|---|---|
|  BODY | active | boolean |
|  BODY | message | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {active: boolean, message: ""} |
| 400 | {errMessage: "Invalid new status"} |
| 500 | {errMessage: "Error updating status"} |

---

### Get Status

#### Request

| Method | Url |
|---|---|
| GET | /api/status/get_status |

| Type  | Params | Values |
|---|---|---|
|   |   |   |

#### Response

| Status  | Response |
|---|---|
| 200 | {active: boolean, message: ""} |
| 500 | {errMessage: "Error getting status"} |

---

---

## Data Exchange

### Import Data

#### Request

| Method | Url |
|---|---|
| POST | /api/dataexchange/import |

| Type  | Params | Values |
|---|---|---|
|   |   |   |

#### Response

| Status  | Response |
|---|---|
|   |   |

---

### Export Data

#### Request

| Method | Url |
|---|---|
| GET | /api/dataexchange/export/:collectionName&:query |

| Type  | Params | Values |
|---|---|---|
|   |   |   |

#### Response

| Status  | Response |
|---|---|
|   |   |

---

---

## Photos

### Home page photos

#### Upload Photos

##### Request

| Method | Url |
|---|---|
| POST | /api/photos/homeUpload|

| Type  | Params | Values |
|---|---|---|
| FILES | file    | File     |
| BODY  | album   | string   |

##### Response

| Status  | Response |
|---|---|
|200   | {album: string, file_id: string, web_link: string} |
|400   | {errMessage: "Error: missing album"}  |
|400   | {errMessage: "Error: missing file"}  |
|500   | {errMessage: "Error: file not saved"}  |

#### Delete Photo

###### Request

| Method | Url |
|---|---|
| DELETE | /api/photos/homeDelete|

| Type  | Params | Values |
|---|---|---|
| QUERY | file_id  | string    |

###### Response

| Status  | Response |
|---|---|
|200   | {success: true}  |
|500   | {errMessage: "Error: file not deleted"} |

---

#### Get Home Photos Data

##### Request

| Method | Url |
|---|---|
| GET | /api/photos/homeGet|

| Type  | Params | Values |
|---|---|---|
| QUERY | album   | string  |

##### Response

| Status  | Response |
|---|---|
|200   | [{album: string, file_id: string, web_link: string},...]  |
|500   | {errMessage: "Couldn't find album"} |



### Renovation photos

#### Upload Photos

##### Request

| Method | Url |
|---|---|
| POST | /api/photos/renoUpload|

| Type  | Params | Values |
|---|---|---|
| FILES | file    | File     |
| BODY  | album   | string   |

##### Response

| Status  | Response |
|---|---|
|200   | {album: string, file_id: string, web_link: string} |
|400   | {errMessage: "Error: missing album"}  |
|400   | {errMessage: "Error: missing file"}  |
|500   | {errMessage: "Error: file not saved"}  |

#### Delete Renovation Photo

##### Request

| Method | Url |
|---|---|
| DELETE | /api/photos/renoDelete|

| Type  | Params | Values |
|---|---|---|
| QUERY | file_id  | string    |

##### Response

| Status  | Response |
|---|---|
|200   | {success: true}  |
|500   | {errMessage: "Error: file not deleted"} |

---

#### Get Renovation Photos Data

##### Request

| Method | Url |
|---|---|
| GET | /api/photos/renoGet|

| Type  | Params | Values |
|---|---|---|
| QUERY | album   | string  |

##### Response

| Status  | Response |
|---|---|
|200   | [{album: string, file_id: string, web_link: string},...]  |
|500   | {errMessage: "Couldn't find album"} |



### Profile picture

#### Upload Profile Picture

##### Request

| Method | Url |
|---|---|
| POST | /api/photos/profileUpload|

| Type  | Params | Values |
|---|---|---|
| FILES | file    | File     |
| BODY  | album   | string   |

##### Response

| Status  | Response |
|---|---|
|200   | {album: string, file_id: string, web_link: string} |
|400   | {errMessage: "Error: missing album"}  |
|400   | {errMessage: "Error: missing file"}  |
|500   | {errMessage: "Error: file not saved"}  |

#### Delete Profile Picture

##### Request

| Method | Url |
|---|---|
| DELETE | /api/photos/profileDelete|

| Type  | Params | Values |
|---|---|---|
| QUERY | file_id  | string    |

##### Response

| Status  | Response |
|---|---|
|200   | {success: true}  |
|500   | {errMessage: "Error: file not deleted"} |

---

#### Get Profile Picture Data

##### Request

| Method | Url |
|---|---|
| GET | /api/photos/profileGet|

| Type  | Params | Values |
|---|---|---|
| QUERY | album   | string  |

##### Response

| Status  | Response |
|---|---|
|200   | [{album: string, file_id: string, web_link: string},...]  |
|500   | {errMessage: "Couldn't find album"} |


---

---

### Home

#### Upload Ad

##### Request

| Method | Url |
|---|---|
| POST | /api/home/upload|

| Type  | Params | Values |
|---|---|---|
| BODY | title     | string   |
| BODY | content   | string   |

##### Response

| Status  | Response |
|---|---|
|200   | {_id: string, title: string, content: string} |
|400   | {errMessage: "Error: missing title"}  |
|400   | {errMessage: "Error: missing content"}  |
|500   | {errMessage: "Error: ad not saved"}  |

#### Delete Ad

##### Request

| Method | Url |
|---|---|
| DELETE | /api/home/delete|

| Type  | Params | Values |
|---|---|---|
| QUERY | id  | string    |

##### Response

| Status  | Response |
|---|---|
|200   | {success: true}  |
|500   | {errMessage: "Error: ad not deleted"} |

---

#### Get Ads

##### Request

| Method | Url |
|---|---|
| GET | /api/home/ads|

| Type  | Params | Values |
|---|---|---|
|   |     |    |

##### Response

| Status  | Response |
|---|---|
|200   | [{_id: string, title: string, content: string},...]  |
|500   | {errMessage: "Couldn't find ads"} |

---

#### Edit Ad

##### Request

| Method | Url |
|---|---|
| GET | /api/home/edit-ad|

| Type  | Params | Values |
|---|---|---|
| BODY  |  _id    | string |
| BODY  |  title  | string |
| BODY  | content | string |

##### Response

| Status  | Response |
|---|---|
|200   | {success: true}  |
|400   | {errMessage: "Ad doesn't exists"} |
| 500  | {errMessage: "Error finding ad"} |
|500   | {errMessage: "Error editing ad"} |


---
---

## Renovations

### Get Renovation Info

#### Request

| Method | Url |
|---|---|
| GET | /api/renovation/get_info/:city/:street/:num |

| Type  | Params | Values |
|---|---|---|
| PARAMS | city  | String  |
| PARAMS | street  | String  |
| PARAMS | num  | int  |

#### Response

| Status  | Response |
|---|---|
| 200 | {isRSVP: boolean, renovation: {addr: {}, created: date, updated: date, date: date, tasks: [{name: username, ... }], ...} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to get renovation info"} |

---

### Get All Renovations

#### Request

| Method | Url |
|---|---|
| GET | /api/renovation/get_all |

| Type  | Params | Values |
|---|---|---|
|  |   |   |

#### Response

| Status  | Response |
|---|---|
| 200 | [{...}, {...}, ...] |
| 400 | {errMessage: "No renovations found"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovations"} |

---

### Create Renovation

#### Request

| Method | Url |
|---|---|
| GET | /api/renovation/create |

| Type  | Params | Values |
|---|---|---|
| BODY  | city  |  String  |
| BODY  | street  |  String  |
| BODY  | num  |  int  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid renovation address"} |
| 400 | {errMessage: "Renovation already exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to create renovation"}  |

---

### Renovation RSVP
Updates a user's RSVP status for a renovation.

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/rsvp |

| Type  | Params | Values |
|---|---|---|
| BODY  | city  |  String  |
| BODY  | street  |  String  |
| BODY  | num  |  int  |

#### Response

| Status  | Response |
|---|---|
| 200 | {rsvp: boolean} |
| 400 | {errMessage: "Invalid renovation address"} |
| 400 | {errMessage: "Renovation does not exists"} |
| 400 | {errMessage: "Renovation does not have a team assigned"} |
| 400 | {errMessage: "Team does not exists"} |
| 400 | {errMessage: "User is not part of renovation team"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to change rsvp status"}  |

---

### Add Tool

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/add_tool |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | tool  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to add tool"} |

---

### Assign Tool
User assigns himself to bring tool

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/assign_tool |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | tool  | object  |
| BODY | email  | string  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or tool"} |
| 400 | {errMessage: "User does not exists"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to assign tool"} |

---

### Unassign Tool
User Unassigns himself from bringing a tool

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/unassign_tool |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | tool  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or tool"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to unassign tool"} |

---

### Delete Tool

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/delete_tool |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | tool  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or tool"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to delete tool"} |

---

### Add Task

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/add_task |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | task  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or task"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to add task"} |

---

### Assign Task

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/assign_task |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | task  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or task"} |
| 400 | {errMessage: "User does not exists"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to assign task"} |

---

### Finished Task

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/done_task |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | task  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or task"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to mark task as done"} |

---

### Edit Task

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/edit_task |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | task  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or task"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to edit task"} |

---

### Delete Task

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/delete_task |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | task  | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or task"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to delete task"} |

---

### Add Pinned Message

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/add_pinned |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | pinned | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or pinned message"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to create new pinned message"} |

---

### Edit Pinned Message

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/edit_pinned |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | pinned | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or pinned message"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to edit pinned message"} |

---

### Delete Pinned Message

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/delete_pinned |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | pinned | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or pinned message"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to delete pinned message"} |

---

### Add Renovation Stage

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/add_stage |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | stage | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or pinned message"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to add new renovation stage"} |

---

### Update Renovation Stage

#### Request

| Method | Url |
|---|---|
| POST | /api/renovation/update_stage |

| Type  | Params | Values |
|---|---|---|
| BODY | city  | String  |
| BODY | street  | String  |
| BODY | num  | int  |
| BODY | stage | object  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No renovation matches the address"} |
| 400 | {errMessage: "Invalid renovation address or pinned message"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find renovation"} |
| 500 | {errMessage: "Failed to update renovation stage"} |

---

---

## Users

### Get User Full Info

#### Request

| Method | Url |
|---|---|
| GET | /api/user/get_info/:email |

| Type  | Params | Values |
|---|---|---|
| PARAMS | email | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {email: "", name: "", role: "", ...} |
| 400 | {errMessage: "Invalid user email"} |
| 400 | {errMessage: "User does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |

---

### Get User Basic Info

#### Request

| Method | Url |
|---|---|
| GET | /api/user/basic/:email |

| Type  | Params | Values |
|---|---|---|
| PARAMS | email | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {email: "", name: "", phone: ""} |
| 400 | {errMessage: "Invalid user email"} |
| 400 | {errMessage: "User does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |

---

### Get All Users

#### Request

| Method | Url |
|---|---|
| GET | /api/user/all_users |

| Type  | Params | Values |
|---|---|---|
|  |   |   |

#### Response

| Status  | Response |
|---|---|
| 200 | [{name: "", email: "", role: "", approved: true, ...}, {...}, ...] |
| 400 | {errMessage: "No users found"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find users"} |

---

### Get All Sign-ups

#### Request

| Method | Url |
|---|---|
| GET | /api/user/all_signups |

| Type  | Params | Values |
|---|---|---|
|  |   |   |

#### Response

| Status  | Response |
|---|---|
| 200 | [{name: "", email: "", role: guest, approved: false, ...}, {...}, ...] |
| 400 | {errMessage: "No signups found"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find signups"} |

---

### Approve User
Approve a user to join Project Hands

#### Request

| Method | Url |
|---|---|
| POST | /api/user/approve |

| Type  | Params | Values |
|---|---|---|
| BODY | email | String  |
| BODY | role  | String  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid user email or role"} |
| 400 | {errMessage: "User does not exists"} |
| 400 | {errMessage: "User already approved"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |
| 500 | {errMessage: "Failed to approve user"} |

---

### Delete User

#### Request

| Method | Url |
|---|---|
| DELETE | /api/user/delete/:email |

| Type  | Params | Values |
|---|---|---|
| PARAMS | email | String  |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid user email"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |
| 500 | {errMessage: "Failed to delete user"} |

---

### Update User Role

#### Request

| Method | Url |
|---|---|
| POST | /api/user/assign_role |

| Type  | Params | Values |
|---|---|---|
| BODY | email | String |
| BODY | newRole | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "No user or new role provided"} |
| 400 | {errMessage: "User does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |
| 500 | {errMessage: "Failed to change user role"} |

---

### Update User Data

#### Request

| Method | Url |
|---|---|
| POST | /api/user/update |

| Type  | Params | Values |
|---|---|---|
| BODY | email | String |
| BODY | name | String |
| BODY | phone | String |
| BODY | role | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Please Provide all required fields"} |
| 400 | {errMessage: "User does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find user"} |
| 500 | {errMessage: "Failed to update user data"} |

---

---

## Teams

### Create Team

#### Request

| Method | Url |
|---|---|
| POST | /api/team/create |

| Type  | Params | Values |
|---|---|---|
| BODY | teamName | String |
| BODY | email | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {name: "", manager: "", members: [""} |
| 400 | {errMessage: "Invalid team name  or email"} |
| 400 | {errMessage: "User does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to create team"} |

---

### Delete Team

#### Request

| Method | Url |
|---|---|
| DELETE | /api/team/delete/:teamName |

| Type  | Params | Values |
|---|---|---|
| PARAMS | teamName | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid team name"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find team"} |
| 500 | {errMessage: "Failed to delete team"} |

---

### Get All Teams

#### Request

| Method | Url |
|---|---|
| GET | /api/team/all_teams |

| Type  | Params | Values |
|---|---|---|
|  |  |  |

#### Response

| Status  | Response |
|---|---|
| 200 | [{name: "", manager: "", members: []}, {...}, ...] |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to get teams"} |

---

### Get Team

#### Request

| Method | Url |
|---|---|
| GET | /api/team/get_team/:teamName |

| Type  | Params | Values |
|---|---|---|
| PARAMS  |  teamName | String |

#### Response

| Status  | Response |
|---|---|
| 200 | [{name: "", manager: "", members: []}] |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to get teams"} |

---

### Add Members

#### Request

| Method | Url |
|---|---|
| POST | /api/team/add_members |

| Type  | Params | Values |
|---|---|---|
| BODY | teamName | String |
| BODY | members | Array |

#### Response

| Status  | Response |
|---|---|
| 200 | {newMembersAdded: ["", "", ...], alreadyInTeam: ["", "", ...]} |
| 400 | {errMessage: "Invalid team name or members email"} |
| 400 | {errMessage: "Team does not exists"} |
| 400 | {errMessage: "Some members do not exists"} |
| 400 | {errMessage: "No new members to add"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to add members to team"} |

---

### Remove Members

#### Request

| Method | Url |
|---|---|
| POST | /api/team/remove_members |

| Type  | Params | Values |
|---|---|---|
| BODY | teamName | String |
| BODY | members | Array |

#### Response

| Status  | Response |
|---|---|
| 200 | {membersRemoved: ["", "", ...], notInTeam: ["", "", ...]} |
| 400 | {errMessage: "Invalid team name or members email"} |
| 400 | {errMessage: "Team does not exists"} |
| 400 | {errMessage: "Some members do not exists"} |
| 400 | {errMessage: "Members are not part of the specified team"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to remove members from team"} |

---

### Assign To Renovation

#### Request

| Method | Url |
|---|---|
| POST | /api/team/assign_to_renovation |

| Type  | Params | Values |
|---|---|---|
| BODY | teamName | String |
| BODY | city |  String |
| BODY | street |  String |
| BODY | num | int |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid team name or renovation address"} |
| 400 | {errMessage: "Team does not exists"} |
| 400 | {errMessage: "Renovation does not exists"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find team"} |
| 500 | {errMessage: "Failed to assign renovation to team"} |

---

### Assign Manager

#### Request

| Method | Url |
|---|---|
| POST | /api/team/assign_manager |

| Type  | Params | Values |
|---|---|---|
| BODY | teamName | String |
| BODY | email | String |

#### Response

| Status  | Response |
|---|---|
| 200 | {success: true} |
| 400 | {errMessage: "Invalid team name or user email"} |
| 400 | {errMessage: "Team does not exists"} |
| 400 | {errMessage: "User does not exists"} |
| 400 | {errMessage: "User is not part of team"} |
| 400 | {errMessage: "User is already manager of team"} |
| 401 | {errMessage: "Error: User is not logged in"} |
| 403 | {errMessage: "Not Allowed"} |
| 500 | {errMessage: "Failed to find team"} |
| 500 | {errMessage: "Failed to assign manager to team"} |

---