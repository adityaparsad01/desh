{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_18 # Updated to Node.js 18.x
  ];
  idx.extensions = [
    "svelte.svelte-vscode",
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm",
          "run",
          "start"
        ];
        env = {
          PORT = "$PORT";
        };
        manager = "web";
      };
    };
  };
}