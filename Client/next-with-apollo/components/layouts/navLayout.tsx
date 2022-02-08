import MainContainer from "../mainContainer";
import NavBottom from "../nav-bottom/navBottom";
import NavTop from "../nav-top/navTop";

type SelectedType = "feed" | "search" | "library"

type LayoutProps = {
  maximized: boolean;
  title: string;
  selected: SelectedType;
  handlerMenuClick: () => void;
  handlerChangeSelected: (input: SelectedType) => void;
};

export const NavLayout: React.FC<LayoutProps> = ({
  handlerMenuClick,
  handlerChangeSelected,
  selected,
  maximized,
  title,
  children,
}) => {
  return (
    <>
      <NavTop />
      <MainContainer title={title} max={maximized} onClickMenu={handlerMenuClick} >
        {children}
      </MainContainer>
      <NavBottom selected={selected} handlerChangeSelected={handlerChangeSelected} />
    </>
  );
};

export default NavLayout;
