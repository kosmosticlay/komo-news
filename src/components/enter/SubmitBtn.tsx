interface SubmitBtnProps {
  children: string;
}

export default function SubmitBtn({ children }: SubmitBtnProps) {
  return <button className="submitBtnStyle">{children}</button>;
}
