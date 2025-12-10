import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { Rating } from '@/shared/ui/rating'

export type TestimonialItem = {
    name: string
    role: string
    company: string
    avatar: string
    rating: number
    content: string
}

const testimonials: TestimonialItem[] = [
    {
        name: 'Lukas Meyer',
        role: 'Content Creator',
        company: 'Freelance',
        content:
            'OrbitReach has completely changed how I manage my social media. Scheduling posts across all my platforms in one calendar saves me so much time!',
        avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        rating: 5,
    },
    {
        name: 'Amira Khan',
        role: 'Social Media Manager',
        company: 'Insight Agency',
        content:
            'This tool has cut my workload in half. Posting to Instagram, TikTok, and YouTube from one dashboard is a game-changer.',
        avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
        rating: 4,
    },
    {
        name: 'Mateo Rossi',
        role: 'Startup Founder',
        company: 'DesignPro Studio',
        content:
            'OrbitReach makes content planning effortless. The calendar keeps my team aligned, and the AI captions help us post consistently without stress.',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4,
    },
    {
        name: 'Clara Jensen',
        role: 'Marketing Specialist',
        company: 'BrandBoost',
        content:
            'Since switching to OrbitReach, our engagement has skyrocketed. We finally have a clear posting strategy across multiple platforms.',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 5,
    },
    {
        name: 'Diego Fernández',
        role: 'Freelance Videographer',
        company: 'CodeCrafters Media',
        content:
            "Best investment I've made! I schedule all my YouTube and Instagram posts in advance — and the support team is incredibly helpful.",
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        rating: 5,
    },
    {
        name: 'Elena Petrova',
        role: 'Product Manager',
        company: 'InnovateX',
        content:
            'OrbitReach keeps our brand voice consistent across every platform. The interface is clean, intuitive, and my team picked it up instantly.',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
    },
]

export const Testimonials01 = () => {
    return (
        <section className="py-10 md:py-14" id="testimonials">
            <Carousel
                className="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8"
                opts={{
                    align: 'start',
                    slidesToScroll: 1,
                }}
            >
                {/* Left Content */}
                <div className="space-y-4 sm:w-1/2 lg:w-1/3">
                    <p className="text-primary text-sm font-medium uppercase">Real customers</p>

                    <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">Customers Feedback</h2>

                    <p className="text-muted-foreground text-xl">
                        From career changes to dream jobs, here&apos;s how Shadcn Studio helped.
                    </p>

                    <div className="flex items-center gap-4">
                        <CarouselPrevious
                            className="disabled:bg-primary/10 disabled:text-primary static translate-y-0 rounded-md disabled:opacity-100"
                            variant="default"
                        />
                        <CarouselNext
                            className="disabled:bg-primary/10 disabled:text-primary static translate-y-0 rounded-md disabled:opacity-100"
                            variant="default"
                        />
                    </div>
                </div>

                {/* Right Testimonial Carousel */}
                <div className="relative max-w-196 sm:w-1/2 lg:w-2/3">
                    <CarouselContent className="sm:-ml-6">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="sm:pl-6 lg:basis-1/2">
                                <Card className="hover:border-primary h-full transition-colors duration-300">
                                    <CardContent className="space-y-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-10 rounded-full">
                                                <AvatarImage alt={testimonial.name} src={testimonial.avatar} />
                                                <AvatarFallback className="rounded-full text-sm">
                                                    {testimonial.name
                                                        .split(' ', 2)
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1">
                                                <h4 className="font-medium">{testimonial.name}</h4>
                                                <p className="text-muted-foreground text-sm">
                                                    {testimonial.role} at{' '}
                                                    <span className="text-card-foreground font-semibold">
                                                        {testimonial.company}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <Rating
                                            readOnly
                                            precision={0.5}
                                            size={24}
                                            value={testimonial.rating}
                                            variant="yellow"
                                        />
                                        <p>{testimonial.content}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
            </Carousel>
        </section>
    )
}
