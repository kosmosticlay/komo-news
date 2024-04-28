interface IEnterTitle {
  children: string;
}

export default function EnterTitle({ children }: IEnterTitle) {
  return <h1 className="font-enter-title">{children}</h1>;
}
