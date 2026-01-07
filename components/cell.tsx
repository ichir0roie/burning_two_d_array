interface Props {
  x: number;
  y: number;
  status: number;
  onClick: (x: number, y: number, status: number) => void;
}

export default function Cell(p: Props) {
  function myColor() {
    if (p.status === 0) {
      return "white";
    } else if (p.status === 1) {
      return "green";
    } else if (p.status === 2) {
      return "red";
    } else if (p.status === 3) {
      return "gray";
    }
    return "black";
  }

  return (
    <div
      style={{
        background: myColor(),
        width: "40px",
        height: "40px",
        border: "1px solid black",
      }}
      onClick={() => {
        p.onClick(p.x, p.y, p.status);
      }}
    ></div>
  );
}
