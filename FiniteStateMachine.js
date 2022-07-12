class FiniteStateMachine
{
    constructor()
    {
        this.states = {
            current_state: null,
            final_state: 'q1',
            initial_state: 'q0'
        };

        this.transitions = {
            delta: (input = String(), state = this.states.initial_state)=>{
                if(input.length == 0) return;

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
                stateMap.set('q1', new Map([['0', 'q1'], ['1', 'q0']]));
        
                return stateMap.get(state);
            }
        };
    }

    evaluate(input)
    {
        this.transitions.delta(input);

        let value;
        
        this.states.current_state == this.states.final_state ?
        value = true :
        value = false;

        return value;
    }
}

let XOR = new FiniteStateMachine();

console.log(XOR.evaluate('101'));
