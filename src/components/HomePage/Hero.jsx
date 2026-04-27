import './Hero.css';

export function Hero() {
    return(
        <>
            <div className="hero-container">
                <div className="hero-intro fade-inn">
                    <h1 className="hero-title">
                        BOOKHLDER
                    </h1>
                    <h3 className="hero-desc">

                        Your next great read starts here.Explore fresh
                         titles and build a library that’s uniquely yours
                    </h3>
                </div>
                <div className="hero-image">
                    <img src="/images/book-img.jpg" alt="Hero Image" className="hero-book-img fade-in">
                    </img>
                </div>
            </div>
        </>
    );
}