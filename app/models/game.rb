class Game < ApplicationRecord
  has_many :piece_types, dependent: :destroy
  has_many :moves, through: :piece_types
  has_many :pieces, through: :piece_types

  after_create do 

    userKing = PieceType.create!(
      game: self, 
      name: "blastoise", 
      front_img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      back_img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    ) 
    
    Piece.create!(
      piece_type: userKing,
      starting_coords: "4,1",
      coords: "4,1",
      home_team: true,
      is_king: true,
      image: userKing.back_img
    )
    
    aiKing = PieceType.create!(
      game: self, 
      name: "charizard", 
      front_img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      back_img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
    )
    
    Piece.create!(
      piece_type: aiKing,
      starting_coords: "4,7",
      coords: "4,7",
      home_team: false,
      is_king: true,
      image: aiKing.front_img
    )
  
  [userKing, aiKing].each { |king|
    Move.create!(
      piece_type: king,
      can_kill: true,
      offset: "0,1"
    )

    Move.create!(
      piece_type: king,
      can_kill: true,
      offset: "0,-1"
    )

    Move.create!(
      piece_type: king,
      can_kill: true,
      offset: "1,0"
    )

    Move.create!(
      piece_type: king,
      can_kill: true,
      offset: "-1,0"
    )
  }

  Move.create!(
    piece_type: aiKing,
    can_kill: true,
    offset: "0,1"
  )

  Move.create!(
    piece_type: aiKing,
    can_kill: true,
    offset: "0,-1"
  )

  Move.create!(
    piece_type: aiKing,
    can_kill: true,
    offset: "1,0"
  )

  Move.create!(
    piece_type: aiKing,
    can_kill: true,
    offset: "-1,0"
  )

  end
end
