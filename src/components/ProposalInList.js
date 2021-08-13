import {
    Link
  } from 'react-router-dom'

export const ProposalInList = (props) => {
    const { status } = props.proposal
    const color = 
        status === 'finished' ? 'blue' :
        status === 'passed' ? 'green' :
        status === 'enacted' ? 'green' :
        status === 'rejected' ? 'red' : 'black'
    const statusClass = `status ${color}`

    return (
        <>
            <Link to={props.proposal.id}>
                <li>
                    <h4 className="type">{props.proposal.type}</h4>
                    <h3>{props.proposal.title}</h3>
                    <h4 className={statusClass}>{props.proposal.status}</h4>
                </li>
            </Link>
            <style>{`
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
                    color: black;
                    font-weight: 300;
                }
                li .status, li .type {
                    text-transform: uppercase;
                    margin: auto 0;
                    font-size: .8rem;
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
