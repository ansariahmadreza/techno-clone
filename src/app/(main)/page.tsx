import Container from "../Container";
import SwiperCar from "./components/mainPage/helper/swipercarsouel";
import Slider from "./components/mainPage/helper/swiperslide";




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

export default home;