import { useEffect, useState } from "react"


function HandleScore({setCurrentScore, clickedSrc, setClickedSrc, bestScore, setBestScore, currentScore}) {

    const [clicked, setClicked] = useState([])
    
    useEffect(() => {
        if (clickedSrc) {
            setClicked((prev) => {
                if (!prev.includes(clickedSrc)) {
                    setCurrentScore((prevScore) => prevScore + 1);
                    setClickedSrc(null)
                    return [...prev, clickedSrc];
                } else {
                    alert('Game Over');
                    setCurrentScore(0);
                    currentScore > bestScore ? setBestScore(currentScore) : null
                    return [];
                }
            });
        }
    }, [clickedSrc]);

    return null
}
  
    
    
function Image({ index, gif, randomizeCards, gifs, setGifs, setClickedSrc }) {
    const handleClick = (event) => {
        const src = event.target.src;
        randomizeCards(gifs, setGifs);
        setClickedSrc(src);
    };

    return (
        <>
            <img
                key={crypto.randomUUID()}
                onClick={handleClick}
                className="flex-1 w-64 h-40 rounded"
                src={gif}
                alt={index}
            />
        </>
    );
}



function Card({text, index, gif, randomizeCards, gifs, setGifs, setCurrentScore, setClickedSrc}) {
        
    return (
        <div className="bg-white border rounded shadow flex flex-col justify-between max-h-100 max-w-full aspect-w-1 aspect-h-1">
            {index !== null ? (
                <div className="flex-1 self-center">
                <Image index={index} gif={gif} setCurrentScore={setCurrentScore} randomizeCards={randomizeCards} gifs={gifs} setGifs={setGifs} setClickedSrc={setClickedSrc}/>
                </div>
            )
            : (
                <div 
                className="flex-1 flex items-center justify-center">
                <span>No Image</span>
                </div>
            )}
            <div className="text-center py-2 flex-none">{!text ? 'hi' : text}</div>
        </div>
    )
}

function createRandomCards() {

    const randomizeCards = (gifs, setGifs) => {
        const taken = []
        const randomizedGifs = []

        for (let i = 0; i < gifs.length; i++) {
            let randomindex

            do {
                randomindex = Math.floor(Math.random() * gifs.length)
            } while (taken.includes(randomindex))

            taken.push(randomindex)
            randomizedGifs.push(gifs[randomindex])
            setGifs(randomizedGifs)
        }
    }

        return {randomizeCards}
}

export default function Cards({ currentScore, bestScore, setCurrentScore, setBestScore }) {
    const [gifs, setGifs] = useState([]);
    const [clickedSrc, setClickedSrc] = useState(null);
    const [clicked, setClicked] = useState([]);

    const { randomizeCards } = createRandomCards();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getImg = async () => {
            try {
                const apiKey = '6HUexvwKzDDBQtVLlJCE6RLUUKCT7A8s';
                const apiEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=18`;

                const response = await fetch(apiEndpoint);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                const imagesList = data.data.map(gif => gif.images.original.url);
                setGifs(imagesList);

            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getImg();
    }, [setGifs]);

    return (
        <>
            <HandleScore
                setCurrentScore={setCurrentScore}
                clickedSrc={clickedSrc}
                clicked={clicked}
                setClicked={setClicked}
                setClickedSrc={setClickedSrc}
                bestScore={bestScore}
                currentScore={currentScore}
                setBestScore={setBestScore}
            />
            <div className="max-h-full flex-1 m-5 p-2 box-border border-4 border-solid border-black">
                <div className="grid grid-cols-6 gap-4 max-h-full max-w-full">
                    {gifs.map((gif, index) => (
                        <Card
                            key={index}
                            text={index + 1}
                            index={index + 1}
                            gif={gif}
                            setGifs={setGifs}
                            randomizeCards={randomizeCards}
                            gifs={gifs}
                            setCurrentScore={setCurrentScore}
                            setClickedSrc={setClickedSrc}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}


