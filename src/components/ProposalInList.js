import {
    Link
  } from 'react-router-dom'

export const ProposalInList = (props) => {
    return (
        <>
            <Link to={props.proposal.id}>
                <li>
                    <h4 className="type">{props.proposal.type}</h4>
                    <h3>{props.proposal.title}</h3>
                    <h4 className="status">{props.proposal.status}</h4>
                </li>
            </Link>
            <style jsx>{`
                li {
                    list-style: none;
                    margin: .5rem 0;
                    border-bottom: 1px solid #eee;
                    padding: .2rem 0 calc(.2rem + 5px) 0;
                    display: grid;
                    grid-template-columns: .2fr 1fr .4fr .3fr;
                    gap: 1rem;
                }
                li .type {
                    color: ${props.proposal.type === 'poi' ? 'red' : 'green'};
                    text-transform: uppercase;
                }
                li .status {
                    text-transform: uppercase;
                }
                h3, h4 {
                    display: inline;
                    margin: 0rem .5rem;
                    padding: 0;
                }
            `}</style>
        </>
    )
}
