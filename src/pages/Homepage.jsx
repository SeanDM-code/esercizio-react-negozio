import { Link } from "react-router-dom";

function Homepage() {

    const callouts = [
        {
          name: 'Smartphones',
          description: 'iPhones, Samsung, OnePlus, See them all.',
          imageSrc: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
          imageAlt: 'A selection of smartphones',

        },
        {
          name: 'Laptops',
          description: 'Working, gaming, studying, find your laptop here.',
          imageSrc: 'https://images.unsplash.com/photo-1575024357670-2b5164f470c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyJTIwcG9ydGF0aWxlJTIwJTdDfGVufDB8fDB8fHww',
          imageAlt: 'A laptop',

        },
        {
          name: 'Earphones',
          description: 'Music for all the occasions, see all available headsets.',
          imageSrc: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFycGhvbmVzfGVufDB8fDB8fHww',
          imageAlt: 'A headset',

        },
        {
          name: 'Smartwatches',
          description: 'Style, functionality and comfort in all our smartwatches.',
          imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D',
          imageAlt: 'A smartwatch',
        },
        {
          name: 'Tablets',
          description: 'Find here the perfect tablet for all your needs.',
          imageSrc: 'https://images.unsplash.com/photo-1527698266440-12104e498b76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGlQYWR8ZW58MHx8MHx8fDA%3D',
          imageAlt: 'A tablet',
        },
      ]
      
        return (
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-none lg:py-6">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
      
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
                  {callouts.map((callout) => (
                    <Link key={callout.name} to={`/product-list/${callout.name.toLocaleLowerCase()}`}>
                    <div  className="group relative">
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={callout.imageSrc}
                          alt={callout.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className=" text-base font-semibold text-indigo-600">
                        
                          <span className="absolute inset-0" />
                          {callout.name}
                    
                      </h3>
                      <p className="mt-2 mb-4 text-sm text-gray-900">{callout.description}</p>
                    </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }

export default Homepage;


