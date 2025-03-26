import { Dimensions } from "react-native"

const responsiveHelper = () => {
const { width, height } = Dimensions.get("window");
const isMobile = width < 768;

return isMobile;
};

export default responsiveHelper;

