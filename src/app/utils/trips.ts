export function splitRequirement(requirements: string): string[] {
  return requirements
    .split('-')
    .map((req) => req.trim())
    .filter((req) => req.length > 0);
}

export function listRequirement(requirements: string[]): string {
  return (
    '- ' +
    requirements.reduce((fullRequirements, requirement, curr) => {
      if (curr == 1) {
        return fullRequirements + '\n- ' + requirement + '\n';
      } else {
        return fullRequirements + '- ' + requirement + '\n';
      }
    })
  );
}
