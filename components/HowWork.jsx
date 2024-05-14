const HowWork = () => {
	return (
		<div className="mycontainer flex flex-col lg:flex-row gap-2 pt-8 pb-12">
			<div className="min-w-80">
				<h2>How it works?</h2>
			</div>
			<div className="cards grid gap-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1">
				<div className="hcard bg-cardbg">
					<h3>
						<span>1</span>API validation
					</h3>
					<p>Input the API key provided by OpenAI to access the service.</p>
				</div>
				<div className="hcard bg-cardbg">
					<h3>
						<span>2</span>Character creation
					</h3>
					<p>
						Create your own unique character by selecting from a diverse array of options. With four distinct choices
						for each race, class, and character home, the possibilities are truly endless.
					</p>
				</div>
				<div className="hcard bg-cardbg">
					<h3>
						<span>3</span>World selection
					</h3>
					<p>
						Where does your character's story originate? Are they a humble fisherman from Marinport, or perhaps an
						intrepid adventurer from Stoneholm in pursuit of their next quest?
					</p>
				</div>
				<div className="hcard bg-cardbg">
					<h3>
						<span>4</span>Adventure awaits
					</h3>
					<p>
						Embark on a personalized adventure with your character, where every choice you make shapes the journey
						ahead. Experience unique rewards and consequences tailored to your actions along the way.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HowWork;
