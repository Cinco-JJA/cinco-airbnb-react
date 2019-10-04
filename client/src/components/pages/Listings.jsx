import React, { useEffect, useState } from 'react'
import './Listings.scss'
import api from '../../api'

const default_images = [
    'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Barcelona_14088603_Pool_2_JSL1.jpg?fit=400,200',
    'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Sydney_14935456_Kitchen_1_JSL1.jpg?fit=400,200',
    'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Rome_10700775_LivingRoom_3_JSL1.jpg?fit=400,200',
    'https://press.airbnb.com/wp-content/uploads/sites/4/2019/09/Nashville_29518280_LivingRoom_2_JSL1.jpg?fit=400,200'
]

export default function Listings() {
    const [listings, setListings] = useState([])
    useEffect(() => {
        api.getListings()
            .then(listings => {
                setListings(listings.listings)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <React.Fragment>
            <h2>List of listings</h2>
            <div id="listings">
                {listings.map(listing => {
                    return (
                        <div id="listing" key={listing._id}>
                            <img alt={listing.title} src={listing.image || default_images[Math.floor(Math.random() * default_images.length)]}></img>
                            <h4>{listing.property_type} ({listing.room_type}) in {listing.neighbourhood}</h4>
                            <h3>{listing.title}</h3>
                            <p><span>{listing.price}/night</span> · {listing.price * 5}</p>
                            <p><span aria-label={listing.title} aria-hidden="false" role="img">⭐</span><span>{listing.reviewRating}</span> ({listing.numReviews})</p>
                        </div>
                    )
                }
                )}
            </div>
        </React.Fragment>
    )
}