export const SelectTravelList = [
    {
        id : 1,
        title : 'Just me',
        description : 'A solo traveles in exploration ',
        icon :'✈️',
        people : '1'
    },
    {
        id : 2,
        title : 'A Couple',
        description : 'Two traveles in tandem ',
        icon :'🥂',
        people : '2 People'
    },
    ,
    {
        id : 3,
        title : 'Family',
        description : 'A group of fun loving adv',
        icon :'🏘️',
        people : '3 or 5 People'
    },,
    {
        id : 4,
        title : 'Friends',
        description : 'A Bunch  of thrill-seekes ',
        icon :'⛵',
        people : '5 to 10 People'
    },
]


export const SelectBudgetOption =[
    {
        id : 1,
        title : 'Cheap',
        description : 'Stay councious of costs',
        icon : '💵'
    },
    {
        id : 2,
        title : 'Moderate',
        description : 'Keep const on the average side',
        icon : '💰'
    },
    {
        id : 3,
        title : 'luxury',
        description : "Don't worry about costs",
        icon : '💸'
    },
]


export const AI_PROMPT = "Generate travel plan for Location : {location} ,for {TotalDays} days for {People} with  a {budget} budget ,give  me hotels options list  with hotel name ,hotel address, price, hotel image url ,geo coordinates, rating ,description and suggest itinerary with placename ,place details, place image url,geo coordinates ,ticket pricing, rating, time travel, each of  the location  for {TotalDays} days  with each day plan  with best time  to visit in JSON format."