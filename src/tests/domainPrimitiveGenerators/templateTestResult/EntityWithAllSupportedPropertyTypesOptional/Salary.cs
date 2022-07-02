using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents EntityWithAllSupportedPropertyTypesOptional's Salary
/// </summary>
public sealed class Salary : ICoreDomainPrimitive<decimal>
{
	/// <summary>
	/// As primitive types are inlined by the compiler the coverlet tool does not catch a hit for 
	/// lines `private const decimal MinValue = 0.01M; and MaxValue.
	/// </summary>
	#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.
	private static readonly decimal MinValue = 0.01M;

	private static readonly decimal MaxValue = 99_999M;

	#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.

	/// <summary>
	/// Shortcut for constructor <see cref="Salary"/>.
	/// <param name="salary">Represents a salary.</param>
	/// <returns>An instance of <see cref="Salary"/></returns>
	/// </summary>
	public static readonly Salary From(string salary) => new(salary);

	private Salary(decimal rawSalary)
	  => Value = Arguments.Between(rawSalary, MinValue, MaxValue, nameof(rawSalary), "Invalid value or format for EntityWithAllSupportedPropertyTypesOptional's Salary");

	/// <summary>
	/// Gets property value
	/// </summary>
	public decimal Value { get; }

}
