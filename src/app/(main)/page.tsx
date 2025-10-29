import Container from "../Container";
import SwiperCar from "./components/mainPage/helper/Swipercarsouel";
import Slider from "./components/mainPage/helper/Swiperslide";


const home = () => {

    return (
        <section>
            <Slider />
            <Container>
                <section>
                    <SwiperCar />
                </section>
            </Container>
        </section>
    )

};

export default home