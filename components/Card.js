import Image from 'next/image';
import styles from '../styles/Card.module.css';

function Card(props) {
  // Détermine si la carte doit être affichée comme étant sélectionnée
  const isSelected = props.selected;

  return (
    <div 
      onClick={() => props.selectCard(props)} // Passer l'objet de la carte entier au lieu de juste l'ID
      className={`${styles.card} ${isSelected && styles.active}`}
    >
      <div className={styles.flipper}>
        {/* La logique ici dépend de si 'isSelected' est vrai. Si la carte est sélectionnée ou appariée, montrez le `cardBack`, sinon le `cardFront`. */}
        {isSelected ? (
          <div className={styles.cardBack}>
            <Image src={`/images/${props.image}`} alt={props.name} width={50} height={50} />
          </div>
        ) : (
          <div className={styles.cardFront}>
            <Image src="/images/questionmark.svg" alt="Card back" width={50} height={50} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;