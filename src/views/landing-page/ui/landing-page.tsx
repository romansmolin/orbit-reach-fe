import React from 'react'

import BeforeAfter from './before-after/before-after'
import Faq2 from './faq/faq2'
import Features3 from './features/feature-3'
import Features1 from './features/features-1'
import { HeroSection01 } from './hero-section/hero-section-01'
// import PricingSection from './pricing/pricing'
import Stats from './stats/stats'
import { Testimonials01 } from './testimonials/testimonials01'

import { Platforms } from './platforms'

const LandingPage = () => {
    return (
        <>
            <HeroSection01 />
            <BeforeAfter />
            <Platforms />
            <Features1 />
            <Features3 />
            <Testimonials01 />
            <Stats />
            {/* <PricingSection /> */}
            <Faq2 />
        </>
    )
}

export default LandingPage
