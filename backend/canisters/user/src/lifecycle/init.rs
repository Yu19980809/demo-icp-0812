use crate::args::lifecycle::init::Args;
use crate::Data;
use crate::lifecycle::{init_env, init_state};
use ic_cdk::init;
use tracing::info;
use utils::env::Environment;

#[init]
fn init(args: Args) {
  // canister_logger::init(args.test_mode);

  let env = init_env([0; 32]);
  let now = env.now();
  
  let data = Data::new(
    args.owner,
    args.test_mode,
    now
  );

  init_state(env, data, args.wasm_version);

  // info!(version = %args.wasm_version, "Initialization complete");
}
