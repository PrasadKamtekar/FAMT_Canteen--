function ItemList() {
  return (
    <div className="w-[30vw] h-[20vh] bg-white rounded-[1vw] p-[2vh] flex">

        <div className="w-8/20">
            <img
                src="https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"
                className="h-[16vh] w-[9vw] rounded-[0.8vw]"
            />
        </div>

        <div className=" w-12/20 pl-[2vh] flex flex-col justify-evenly">

            <h1 className="font-semibold tracking-wider">
                Misal Pav <br />
                <span>₹ 25</span>
            </h1>

            <button className="bg-[#E6F7F3] w-full rounded-[0.5vw] text-[#00AD8F] p-[0.4vw] text-[0.9vw]">
                Add to cart
            </button>

        </div>

    </div>
  )
}

export default ItemList