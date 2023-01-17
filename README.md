# Intro to the demo

## How to start it

1. Make sure you have Docker and Docker compose installed
2. Navigate to the location of this folder and run `docker-compose down -v && docker-compose up --build`
3. You can access the api endpoints from `localhost:3000`

## Endpoints

### Menu

###### Menu: Get single
__GET:__ `localhost:3000/menu`

__Params:__ None

__Body:__ None

__Response Format:__
```
[
    {
        "id": 1,
        "title": "section 1",
        "sections": [
            {
                "id": 1,
                "title": "item 1",
                "price": 20.2,
                "modifiers": [
                    {
                        "id": 1,
                        "title": "modifier 1"
                    }
                ]
            }
        ]
    }
]
```

### Sections

###### Sections: Get many
__GET:__ `localhost:3000/sections`

__Params:__ None

__Body:__ None

__Response Format:__
```
[
    {
        "id": 1,
        "title": "section 1",
        "description": "section 1"
    }
]
```

###### Sections: Get one
__GET:__ `localhost:3000/sections/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{
    "id": 1,
    "title": "section 1",
    "description": "section 1"
}
```

###### Sections: Create one
__POST:__ `localhost:3000/sections`

__Params:__ None

__Body:__

* __name:__ String
* __description:__ String

__Response Format:__
```
{ message: 'Success' }
```

###### Sections: Update one
__PUT:__ `localhost:3000/sections/:id`

__Params:__

* __id:__ String

__Body:__

* __name:__ String
* __description:__ String

__Response Format:__
```
{ message: 'Success' }
```

###### Sections: Delete one
__PUT:__ `localhost:3000/sections/delete/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{ message: 'Success' }
```

### Items

###### Items: Get many
__GET:__ `localhost:3000/items`

__Params:__ None

__Body:__ None

__Response Format:__
```
[
    {
        "id": 1,
        "title": "item 1",
        "description": "item 1",
        "price": 20.2,
        "section_id": 1,
        "modifiers": [
            {
                "id": 1,
                "description": "modifier 1"
            }
        ]
    }
]
```

###### Items: Get one
__GET:__ `localhost:3000/items/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{
    "id": 1,
    "title": "item 1",
    "description": "item 1",
    "price": 20.2,
    "section_id": 1,
    "modifiers": [
        {
            "id": 1,
            "description": "modifier 1"
        }
    ]
}
```

###### Items: Create one
__POST:__ `localhost:3000/items`

__Params:__ None

__Body:__

* __name:__ String
* __description:__ String
* __price:__ Number
* __section_id:__ Number

__Response Format:__
```
{ message: 'Success' }
```

###### Items: Update one
__PUT:__ `localhost:3000/items/:id`

__Params:__

* __id:__ String

__Body:__

* __name:__ String
* __description:__ String
* __price:__ Number
* __section_id:__ Number

__Response Format:__
```
{ message: 'Success' }
```

###### Items: Delete one
__PUT:__ `localhost:3000/items/delete/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{ message: 'Success' }
```

###### Items: Map to modifiers
__POST:__ `localhost:3000/items/map-to-modifiers`

__Params:__ None

__Body:__

* __values:__ Object[]
  - __item_id:__ Number
  - __modifier_id:__ Number

__Response Format:__
```
{ message: 'Success' }
```

### Modifiers

###### Modifiers: Get many
__GET:__ `localhost:3000/modifiers`

__Params:__ None

__Body:__ None

__Response Format:__
```
[
    {
        "id": 1,
        "description": "modifier 1"
    }
]
```

###### Modifiers: Get one
__GET:__ `localhost:3000/modifiers/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{
    "id": 1,
    "description": "modifier 1"
}
```

###### Modifiers: Create one
__POST:__ `localhost:3000/modifiers`

__Params:__ None

__Body:__

* __description:__ String

__Response Format:__
```
{ message: 'Success' }
```

###### Modifiers: Update one
__PUT:__ `localhost:3000/modifiers/:id`

__Params:__

* __id:__ String

__Body:__

* __name:__ String
* __description:__ String

__Response Format:__
```
{ message: 'Success' }
```

###### Modifiers: Delete one
__PUT:__ `localhost:3000/modifiers/delete/:id`

__Params:__

* __id:__ String

__Body:__ None

__Response Format:__
```
{ message: 'Success' }
```
