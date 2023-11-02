import LogInForm from "./Forms/LogInForm"
const LogIn = ()=>{
    return(
        <main>
            <section className="Log">
                <article className="Video">
                <iframe width="100%" height='110%' src="https://www.youtube.com/embed/q22tJJQ75co?autoplay=1&mute=1&controls=0&loop=1&playlist=q22tJJQ75co" title="Wine promo video that I shot in 2 hours 100% ELEGANT" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        
                </article>

                <article className="Form">
                    <LogInForm/>
                </article>
            </section>
        </main>
    )
}
export default LogIn
