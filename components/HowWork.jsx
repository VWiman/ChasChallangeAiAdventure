const HowWork = () => {
  return (
    <div className="mycontainer flex gap-2 pt-8 pb-12">
      <div className="min-w-80">
        <h2>How it works?</h2>
      </div>
      <div className="cards grid gap-4 grid-cols-2 grid-rows-2">
        <div className="hcard bg-cardbg">
          <h3><span>1</span>API validation</h3>
          <p>Alias quaerat natus, voluptatum sit id non? Sapiente ipsum aliquid, dolore.</p>
        </div>
        <div className="hcard bg-cardbg">
          <h3><span>2</span>World selection</h3>
          <p>Alias quaerat natus, voluptatum sit id non? Sapiente ipsum aliquid, dolore perferendis soluta excepturi autem iure vel dolorem nihil impedit a incidunt.</p>
        </div>
        <div className="hcard bg-cardbg">
          <h3><span>3</span>Character creation</h3>
          <p>Alias quaerat natus, voluptatum sit id non? Sapiente ipsum aliquid, dolore perferendis soluta excepturi autem iure vel dolorem nihil impedit a incidunt.</p>
        </div>
        <div className="hcard bg-cardbg">
          <h3><span>4</span>Adventure await</h3>
          <p>Alias quaerat natus, voluptatum sit id non? Sapiente ipsum aliquid, dolore perferendis soluta excepturi autem iure vel dolorem nihil impedit a incidunt.</p>
        </div>
      </div>
    </div>
	);
};

export default HowWork;
