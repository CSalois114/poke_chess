export default function Tile({
  piece,
  coords,
  move,
  pieceClickFn,
  tileClickFn,
  offset,
  selectedOffset,
  pieceSelectedCoords,
  colorTag,
}) {
  let colorClass = colorTag || "";
  piece && (colorClass += piece.home_team ? " user" : " enemy");
  if(move) {
    colorClass += " moveable"
    move.can_kill && (colorClass += " canKill")
    move.must_kill && (colorClass += " mustKill")
  }
  piece?.is_king && (colorClass += " king");
  offset && offset === selectedOffset && (colorClass += " selected");
  coords && pieceSelectedCoords === coords && (colorClass += " pieceSelected")

  const image = piece?.image || piece?.front_img
  return (
    <div
      className={`tile ${colorClass}`}
      style={{boxShadow: `${4 - coords?.split(',')[0]}px 4px 2px rgba(56, 52, 51, 0.71)`}}
      onClick={() => tileClickFn && tileClickFn(coords || offset)}
    >
      <div className="imgContainer" >
        {image ? <img src={image} onClick={() => pieceClickFn && pieceClickFn(piece)} /> : null }
      </div>
    </div>
  );
}
