export interface RootContainer {
    children: React.ReactNode
}

const Container = ({ children }: RootContainer) => {
    return (
        <section className="container  mx-auto px-4 ">
            {children}
        </section>
    );
};
export default Container;