class FiniteStateMachine
{
    constructor()
    {
        this.states = {
            current_state: null,
            q0: 'q0',
            q1: 'q1',
            q2: 'q2'
        };

        this.transitions = {
            delta: (input = String(), state = this.states.q0)=>{
                if(input.length == 0)
                    return this.states.current_state;

                let split_input = input.split('');
                let current_input = split_input[0];
                split_input.shift();
                let reformed_input = split_input.join('');
    
                let mapping = this.transitions.mapping(state);
                this.states.current_state = mapping.get(current_input);

                this.transitions.delta(reformed_input, this.states.current_state);
            },
            mapping: (state)=>{
                let stateMap = new Map();

                stateMap.set('q0', new Map([['0', 'q0'], ['1', 'q1']]));
                stateMap.set('q1', new Map([['0', 'q0'], ['1', 'q2']]));
                stateMap.set('q2', new Map([['0', 'q2'], ['1', 'q1']]));
        
                return stateMap.get(state);
            }
        };
    }

    evaluate(input)
    {
        this.transitions.delta(input);
        return this.states.current_state;
    }
}

let machine = new FiniteStateMachine();

console.log(machine.evaluate('101100100010101010101101'));  //Ouputs: q1